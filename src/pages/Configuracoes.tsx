import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Save,
  Shield,
  User,
  Bell,
  Database,
  Key,
  Users,
  GraduationCap,
  Lock
} from "lucide-react";

export default function Configuracoes() {
  const [notificacoes, setNotificacoes] = useState(true);
  const [backupAutomatico, setBackupAutomatico] = useState(true);
  const [loginDuplo, setLoginDuplo] = useState(false);

  // Mock data - será substituído pelos dados reais do Supabase
  const usuarios = [
    {
      id: 1,
      nome: "Admin Sistema",
      email: "admin@vidaefuturo.org",
      tipo: "SuperUser",
      status: "ativo",
      ultimoLogin: "2025-01-27 08:30"
    },
    {
      id: 2,
      nome: "Secretária Maria",
      email: "secretaria@vidaefuturo.org",
      tipo: "Admin",
      status: "ativo",
      ultimoLogin: "2025-01-27 07:45"
    },
    {
      id: 3,
      nome: "Prof. Carlos Silva",
      email: "carlos.silva@vidaefuturo.org",
      tipo: "User",
      status: "ativo",
      ultimoLogin: "2025-01-26 14:20"
    },
  ];

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "SuperUser":
        return "bg-destructive text-destructive-foreground";
      case "Admin":
        return "bg-warning text-warning-foreground";
      case "User":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted";
    }
  };

  const getPermissoes = (tipo: string) => {
    switch (tipo) {
      case "SuperUser":
        return "Acesso completo (visualização, edição, configuração)";
      case "Admin":
        return "Visualização e edição de cadastros gerais";
      case "User":
        return "Visualização e sistema de faltas";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Configurações</h1>
          <p className="text-muted-foreground mt-1">
            Configurações gerais do sistema
          </p>
        </div>
        <Button className="bg-success hover:shadow-glow transition-all duration-300 text-success-foreground">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configurações do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="projeto-nome" className="text-sm font-medium">
                Nome do Projeto
              </Label>
              <Input 
                id="projeto-nome"
                defaultValue="Vida e Futuro"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="instituicao" className="text-sm font-medium">
                Instituição
              </Label>
              <Input 
                id="instituicao"
                defaultValue="Projeto Social Vida e Futuro"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="contato" className="text-sm font-medium">
                Email de Contato
              </Label>
              <Input 
                id="contato"
                type="email"
                defaultValue="contato@vidaefuturo.org"
                className="mt-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Notificações</Label>
                <p className="text-xs text-muted-foreground">
                  Receber notificações sobre atividades importantes
                </p>
              </div>
              <Switch checked={notificacoes} onCheckedChange={setNotificacoes} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Backup Automático</Label>
                <p className="text-xs text-muted-foreground">
                  Realizar backup dos dados automaticamente
                </p>
              </div>
              <Switch checked={backupAutomatico} onCheckedChange={setBackupAutomatico} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Autenticação em Duas Etapas</Label>
                <p className="text-xs text-muted-foreground">
                  Maior segurança para login de usuários
                </p>
              </div>
              <Switch checked={loginDuplo} onCheckedChange={setLoginDuplo} />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-accent-teal/10 border border-accent-teal/20 rounded-lg">
              <h4 className="font-medium text-accent-teal mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Integração com Supabase Necessária
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Para implementar o sistema de autenticação e permissões descrito, você precisará conectar o projeto ao Supabase.
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                O sistema suportará três níveis de acesso:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                <li>• <strong>SuperUser:</strong> Acesso completo ao sistema</li>
                <li>• <strong>Admin/Secretário:</strong> Gestão de cadastros</li>
                <li>• <strong>Professor/User:</strong> Visualização e chamadas</li>
              </ul>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Últimas Atividades de Segurança</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                  <Key className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-foreground">Login realizado com sucesso</p>
                    <p className="text-xs text-muted-foreground">admin@vidaefuturo.org - 27/01/2025 08:30</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                  <Database className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-foreground">Backup automático realizado</p>
                    <p className="text-xs text-muted-foreground">26/01/2025 23:00</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Management */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Users className="w-5 h-5" />
            Usuários do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {usuarios.map((usuario) => (
              <div
                key={usuario.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{usuario.nome}</h4>
                    <p className="text-sm text-muted-foreground">{usuario.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Último login: {usuario.ultimoLogin}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <Badge className={getTipoColor(usuario.tipo)}>
                    {usuario.tipo}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                    {getPermissoes(usuario.tipo)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-primary">Informações do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-lg font-bold text-primary mb-2">v1.0.0</div>
              <div className="text-sm text-muted-foreground">Versão do Sistema</div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-lg font-bold text-success mb-2">Online</div>
              <div className="text-sm text-muted-foreground">Status do Sistema</div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-lg font-bold text-accent-teal mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}