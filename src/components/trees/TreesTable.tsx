
import React from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Database } from '@/integrations/supabase/types';
import { Eye, Pencil, Trash2 } from 'lucide-react';

type Tree = Database['public']['Tables']['trees']['Row'];

interface TreesTableProps {
  trees: Tree[];
}

export function TreesTable({ trees }: TreesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Species</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Planted On</TableHead>
            <TableHead>Height (cm)</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trees.map((tree) => (
            <TableRow key={tree.id}>
              <TableCell className="font-medium">{tree.name}</TableCell>
              <TableCell>{tree.species}</TableCell>
              <TableCell>{tree.location}</TableCell>
              <TableCell>{format(new Date(tree.planting_date), 'MMM d, yyyy')}</TableCell>
              <TableCell>{tree.height_cm || '-'}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Link to={`/trees/${tree.id}`}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </Link>
                <Link to={`/trees/${tree.id}/edit`}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
