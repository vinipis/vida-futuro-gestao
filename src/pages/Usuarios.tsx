import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { z } from 'zod';
import { UserPlus } from 'lucide-react';

const userSchema = z.object({
  fullName: z.string().min(3, { message: 'Nome completo deve ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
  role: z.enum(['admin', 'professor', 'secretario', 'aluno'], { message: 'Selecione uma função válida' }),
});

export default function Usuarios() {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'professor' | 'secretario' | 'aluno'>('aluno');

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = userSchema.parse({
        fullName,
        email,
        password,
        role,
      });

      const { error } = await signUp(
        validatedData.email,
        validatedData.password,
        validatedData.fullName,
        validatedData.role
      );

      if (error) {
        if (error.message.includes('User already registered')) {
          toast.error('Este email já está cadastrado');
        } else {
          toast.error(error.message || 'Erro ao criar usuário');
        }
      } else {
        toast.success('Usuário criado com sucesso!');
        setFullName('');
        setEmail('');
        setPassword('');
        setRole('aluno');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else {
        toast.error('Erro ao processar o cadastro');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gerenciar Usuários</h1>
        <p className="text-muted-foreground">Cadastre novos usuários no sistema</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Criar Novo Usuário
          </CardTitle>
          <CardDescription>
            Preencha os dados do novo usuário e selecione sua função no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Nome completo do usuário"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Função</Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as typeof role)}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aluno">Aluno</SelectItem>
                  <SelectItem value="professor">Professor</SelectItem>
                  <SelectItem value="secretario">Secretário</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Criando usuário...' : 'Criar Usuário'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
