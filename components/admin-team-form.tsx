"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, X, Upload, Loader2, Github, Linkedin, Twitter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import type { TeamMember, TeamMemberFormData } from '@/types/team';
import Image from 'next/image';

interface AdminTeamFormProps {
  member: TeamMember | null;
  onSave: (memberData: TeamMemberFormData, id?: number) => Promise<void>;
  onCancel: () => void;
}

const DEFAULT_MEMBER: TeamMemberFormData = {
  name: '',
  role: '',
  bio: '',
  avatar_url: '',
  socials: { github: '', linkedin: '', twitter: '' },
  team_type: 'Developer',
  display_order: 0,
};

export default function AdminTeamForm({ member, onSave, onCancel }: AdminTeamFormProps) {
  const isEditing = !!member;
  const [formData, setFormData] = useState<TeamMemberFormData>({ ...DEFAULT_MEMBER });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (member) {
      setFormData({
        ...DEFAULT_MEMBER,
        ...member,
        socials: { ...DEFAULT_MEMBER.socials, ...member.socials },
      });
    } else {
      setFormData(DEFAULT_MEMBER);
    }
  }, [member]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socials: { ...prev.socials, [name]: value },
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      toast.error('ImgBB API key is not configured.');
      return;
    }

    const body = new FormData();
    body.append('image', file);
    setIsUploading(true);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, { method: 'POST', body });
      const result = await response.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, avatar_url: result.data.display_url }));
        toast.success('Image uploaded successfully!');
      } else {
        throw new Error(result.error?.message || 'Unknown error uploading to ImgBB');
      }
    } catch (error: any) {
      toast.error('Image upload failed', { description: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Filter out empty social links
      const socialsData = { ...formData.socials };
      if (!socialsData.github) delete socialsData.github;
      if (!socialsData.linkedin) delete socialsData.linkedin;
      if (!socialsData.twitter) delete socialsData.twitter;
      
      const dataToSave = { ...formData, socials: socialsData };
      await onSave(dataToSave, member?.id);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{isEditing ? 'Edit Team Member' : 'Add New Team Member'}</h2>
            <Button type="button" variant="ghost" onClick={onCancel}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Team List
            </Button>
          </div>
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-lg font-medium">Profile Picture</h3>
              <div className="relative w-40 h-40 rounded-full overflow-hidden mx-auto border-2 border-dashed">
                {formData.avatar_url ? (
                  <Image src={formData.avatar_url} alt="Avatar" layout="fill" objectFit="cover" />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">No Image</div>
                )}
              </div>
              <Button type="button" variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                {isUploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </Button>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>

            <div className="md:col-span-2 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role / Title *</Label>
                  <Input id="role" name="role" value={formData.role} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} rows={4} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="team_type">Team *</Label>
                  <Select name="team_type" value={formData.team_type} onValueChange={(value) => handleSelectChange('team_type', value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Leadership">Leadership</SelectItem>
                      <SelectItem value="Developer">Developer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input id="display_order" name="display_order" type="number" value={formData.display_order} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
             <h3 className="text-lg font-medium mb-4">Social Media Links</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <div className="relative flex items-center">
                    <Github className="absolute left-3 h-4 w-4 text-muted-foreground" />
                    <Input id="github" name="github" value={formData.socials?.github || ''} onChange={handleSocialChange} className="pl-9" placeholder="e.g., https://github.com/user" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <div className="relative flex items-center">
                    <Linkedin className="absolute left-3 h-4 w-4 text-muted-foreground" />
                    <Input id="linkedin" name="linkedin" value={formData.socials?.linkedin || ''} onChange={handleSocialChange} className="pl-9" placeholder="e.g., https://linkedin.com/in/user" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter / X</Label>
                  <div className="relative flex items-center">
                    <Twitter className="absolute left-3 h-4 w-4 text-muted-foreground" />
                    <Input id="twitter" name="twitter" value={formData.socials?.twitter || ''} onChange={handleSocialChange} className="pl-9" placeholder="e.g., https://x.com/user" />
                  </div>
                </div>
             </div>
          </div>

          <Separator />

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Save Changes' : 'Add Team Member'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 