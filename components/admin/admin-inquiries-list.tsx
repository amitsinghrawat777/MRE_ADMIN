"use client";

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';
import { Inquiry } from "@/types/inquiry";
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface AdminInquiriesListProps {
  inquiries: Inquiry[];
  onDelete: (id: number) => void;
}

export default function AdminInquiriesList({ inquiries, onDelete }: AdminInquiriesListProps) {
  const [inquiryToDelete, setInquiryToDelete] = useState<Inquiry | null>(null);

  const handleDeleteConfirm = () => {
    if (inquiryToDelete) {
      onDelete(inquiryToDelete.id);
      setInquiryToDelete(null);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Received</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.map((inquiry) => (
            <TableRow key={inquiry.id}>
              <TableCell>
                {inquiry.properties ? (
                  <Link href={`/properties/${inquiry.properties.id}`} className="hover:underline text-blue-400">
                    {inquiry.properties.title}
                  </Link>
                ) : (
                  <span className="text-muted-foreground">Property not available</span>
                )}
              </TableCell>
              <TableCell>{inquiry.name}</TableCell>
              <TableCell>
                <a href={`mailto:${inquiry.email}`} className="text-blue-400 hover:underline">{inquiry.email}</a>
              </TableCell>
              <TableCell>{inquiry.phone || "-"}</TableCell>
              <TableCell className="max-w-xs truncate">{inquiry.message}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {formatDistanceToNow(new Date(inquiry.created_at), { addSuffix: true })}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setInquiryToDelete(inquiry)}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {inquiries.length === 0 && (
        <p className="text-center text-muted-foreground py-10">No inquiries yet.</p>
      )}

      <AlertDialog open={!!inquiryToDelete} onOpenChange={(open) => !open && setInquiryToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Inquiry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this inquiry from "{inquiryToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setInquiryToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 