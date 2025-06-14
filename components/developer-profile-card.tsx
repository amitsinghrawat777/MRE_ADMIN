import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

interface DeveloperProfileCardProps {
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export default function DeveloperProfileCard({
  name,
  role,
  avatarUrl,
  bio,
  socials,
}: DeveloperProfileCardProps) {
  return (
    <div className="bg-card border rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="p-6 text-center">
        <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-primary/20">
          <Image
            src={avatarUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-primary text-sm mb-3">{role}</p>
        <p className="text-muted-foreground text-sm leading-relaxed">{bio}</p>
      </div>
      <div className="bg-muted/30 p-4 border-t">
        <div className="flex justify-center space-x-3">
          {socials.github && (
            <Button asChild variant="ghost" size="icon">
              <Link href={socials.github} target="_blank" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
          )}
          {socials.linkedin && (
            <Button asChild variant="ghost" size="icon">
              <Link href={socials.linkedin} target="_blank" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
          )}
          {socials.twitter && (
            <Button asChild variant="ghost" size="icon">
              <Link href={socials.twitter} target="_blank" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 