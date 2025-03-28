
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UserRoundSearch, X } from 'lucide-react';

export type PersonType = 'student' | 'teacher' | 'management' | 'administrative';

export interface SearchResult {
  id: string | number;
  name: string;
  role: PersonType;
  photo?: string;
  details?: string;
}

interface SearchResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  results: SearchResult[];
  onSelectPerson: (result: SearchResult) => void;
}

const getRoleBadge = (role: PersonType) => {
  switch (role) {
    case 'student':
      return { label: 'Aluno', color: 'bg-blue-100 text-blue-800' };
    case 'teacher':
      return { label: 'Professor', color: 'bg-purple-100 text-purple-800' };
    case 'management':
      return { label: 'Equipe Gestora', color: 'bg-amber-100 text-amber-800' };
    case 'administrative':
      return { label: 'Administrativo', color: 'bg-green-100 text-green-800' };
    default:
      return { label: 'Funcionário', color: 'bg-slate-100 text-slate-800' };
  }
};

const SearchResultDialog: React.FC<SearchResultDialogProps> = ({
  open,
  onOpenChange,
  results,
  onSelectPerson
}) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Resultados da Pesquisa</DialogTitle>
          <DialogDescription>
            {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="max-h-[60vh] overflow-y-auto mt-2">
          {results.length === 0 ? (
            <div className="text-center py-8">
              <UserRoundSearch className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-semibold">Nenhum resultado encontrado</h3>
              <p className="text-sm text-muted-foreground">Tente um termo diferente na busca</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {results.map((result) => {
                const { label, color } = getRoleBadge(result.role);
                return (
                  <li 
                    key={`${result.role}-${result.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer"
                    onClick={() => onSelectPerson(result)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={result.photo} alt={result.name} />
                      <AvatarFallback>{result.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{result.name}</p>
                      {result.details && (
                        <p className="text-xs text-muted-foreground truncate">{result.details}</p>
                      )}
                    </div>
                    <Badge className={color}>{label}</Badge>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchResultDialog;
