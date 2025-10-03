import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Helpers
function badReq(res: Response, msg: string) {
  return res.status(400).json({ error: msg });
}
function parseDateOrNull(s?: string) {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

// -------- People (alunos/professores) ----------
router.post("/people", async (req, res) => {
  try {
    const { fullName, email, document, phone } = req.body ?? {};
    if (!fullName) return badReq(res, "fullName é obrigatório");
    const person = await prisma.person.create({
      data: { fullName, email, document, phone },
    });
    res.json(person);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// -------- Courses ----------
router.post("/courses", async (req, res) => {
  try {
    const { name, modality, active = true } = req.body ?? {};
    if (!name || !modality) return badReq(res, "name e modality são obrigatórios");
    const course = await prisma.course.create({ data: { name, modality, active } });
    res.json(course);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/courses", async (_req, res) => {
  try {
    const courses = await prisma.course.findMany({ orderBy: { createdAt: "desc" } });
    res.json(courses);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// -------- Classes (turmas) ----------
router.post("/classes", async (req, res) => {
  try {
    const { courseId, name, capacity, startDate, endDate } = req.body ?? {};
    if (!courseId || !name || !startDate || !endDate) {
      return badReq(res, "courseId, name, startDate e endDate são obrigatórios");
    }
    const start = parseDateOrNull(startDate);
    const end = parseDateOrNull(endDate);
    if (!start || !end) return badReq(res, "datas inválidas (use YYYY-MM-DD)");
    const clazz = await prisma.class.create({
      data: { courseId, name, capacity: capacity ?? null, startDate: start, endDate: end },
    });
    res.json(clazz);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/classes", async (req, res) => {
  try {
    const { courseId } = req.query as { courseId?: string };
    const classes = await prisma.class.findMany({
      where: courseId ? { courseId } : undefined,
      orderBy: { createdAt: "desc" },
    });
    res.json(classes);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/classes/:classId/enrollments", async (req, res) => {
  try {
    const { classId } = req.params;
    const enrolls = await prisma.enrollment.findMany({
      where: { classId },
      include: { person: true },
      orderBy: { createdAt: "asc" },
    });
    const data = enrolls.map(e => ({
      enrollmentId: e.id,
      personId: e.personId,
      fullName: e.person.fullName,
      email: e.person.email,
      status: e.status,
    }));
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// -------- Enrollments (matrículas) ----------
router.post("/enrollments", async (req, res) => {
  try {
    const { classId, personId } = req.body ?? {};
    if (!classId || !personId) return badReq(res, "classId e personId são obrigatórios");

    // Evitar duplicidade simples
    const exists = await prisma.enrollment.findFirst({ where: { classId, personId } });
    if (exists) return res.json(exists);

    const enr = await prisma.enrollment.create({ data: { classId, personId } });
    res.json(enr);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// -------- Lessons (aulas) + Attendance (chamada) ----------
router.post("/classes/:classId/lessons/open", async (req, res) => {
  try {
    const { classId } = req.params;
    const { date, title, isExtra = false } = req.body ?? {};
    if (!date) return badReq(res, "date é obrigatório (YYYY-MM-DD)");

    const d = parseDateOrNull(date);
    if (!d) return badReq(res, "date inválido");

    // cria a aula (se não existir) devido ao @@unique([classId,date])
    const lesson = await prisma.lesson.upsert({
      where: { classId_date: { classId, date: d } },
      update: { title: title ?? undefined, isExtra },
      create: { classId, date: d, title: title ?? null, isExtra },
    });

    // gera presenças pendentes para todos matriculados (status enrolled)
    const enrolls = await prisma.enrollment.findMany({
      where: { classId, status: "enrolled" },
      select: { id: true },
    });

    if (enrolls.length > 0) {
      await prisma.attendance.createMany({
        data: enrolls.map(e => ({ lessonId: lesson.id, enrollmentId: e.id })),
        skipDuplicates: true, // devido ao @@unique([lessonId,enrollmentId])
      });
    }

    res.json(lesson);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/lessons/:lessonId/attendance", async (req, res) => {
  try {
    const { lessonId } = req.params;
    const items = await prisma.attendance.findMany({
      where: { lessonId },
      include: {
        enrollment: { include: { person: true } },
      },
      orderBy: { id: "asc" },
    });
    const data = items.map(a => ({
      attendanceId: a.id,
      enrollmentId: a.enrollmentId,
      personId: a.enrollment.personId,
      fullName: a.enrollment.person.fullName,
      present: a.present,
      note: a.note ?? null,
    }));
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/attendance/bulk", async (req, res) => {
  try {
    const { lessonId, items } = req.body ?? {};
    if (!lessonId || !Array.isArray(items)) {
      return badReq(res, "lessonId e items[] são obrigatórios");
    }
    // aplica em paralelo
    await Promise.all(
      items.map((it: any) =>
        prisma.attendance.update({
          where: { lessonId_enrollmentId: { lessonId, enrollmentId: it.enrollmentId } },
          data: { present: it.present ?? null, note: it.note ?? null },
        })
      )
    );
    res.json({ ok: true, count: items.length });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
