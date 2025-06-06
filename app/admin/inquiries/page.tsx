import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';

export const metadata = {
  title: "Inquiries | Admin Dashboard",
};

export default async function InquiriesPage() {
  const supabase = createClient();
  const { data: inquiries, error } = await supabase
    .from("inquiries")
    .select(`
      *,
      properties (
        id,
        title
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching inquiries:", error);
    return <p className="text-center py-20">Could not load inquiries.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Inquiries</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Received</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell>
                  {inquiry.properties ? (
                    <Link href={`/properties/${inquiry.properties.id}`} className="hover:underline text-blue-600">
                      {inquiry.properties.title}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">Property deleted</span>
                  )}
                </TableCell>
                <TableCell>{inquiry.name}</TableCell>
                <TableCell>
                  <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">{inquiry.email}</a>
                </TableCell>
                <TableCell>{inquiry.phone || "-"}</TableCell>
                <TableCell className="max-w-xs truncate">{inquiry.message}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {formatDistanceToNow(new Date(inquiry.created_at), { addSuffix: true })}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {inquiries.length === 0 && (
          <p className="text-center text-muted-foreground py-10">No inquiries yet.</p>
        )}
      </CardContent>
    </Card>
  );
} 