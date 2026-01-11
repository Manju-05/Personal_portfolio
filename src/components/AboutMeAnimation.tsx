import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { MapPin } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- Inline UI Components (Simplified) ---

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-3xl border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

const Avatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />
));
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(({ className, ...props }, ref) => (
    <img ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)} {...props} />
));
AvatarFallback.displayName = "AvatarFallback";

// --- Main Animation Components ---

export interface SocialLink {
    id: string;
    url: string;
    icon: React.ReactNode;
    label: string;
}

export interface ProfileCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    location: string;
    bio: string;
    avatarSrc: string;
    avatarFallback: string;
    variant?: 'default' | 'on-accent';
    socials?: SocialLink[];
    showAvatar?: boolean;
    titleStyle?: React.CSSProperties;
    cardStyle?: React.CSSProperties;
    descriptionClassName?: string;
    bioClassName?: string;
    footerClassName?: string;
}

export const ProfileCardContent = React.forwardRef<HTMLDivElement, ProfileCardContentProps>(
    ({ className, name, location, bio, avatarSrc, avatarFallback, variant = 'default', socials = [], showAvatar = true, titleStyle, cardStyle, descriptionClassName, bioClassName, footerClassName, ...props }, ref) => {
        const isOnAccent = variant === 'on-accent';

        return (
            <Card
                ref={ref}
                className={cn(
                    'w-full h-full p-8 flex flex-col rounded-[2.5rem] border-0 transition-colors duration-500',
                    isOnAccent ? 'text-white' : 'bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-white',
                    className
                )}
                style={cardStyle}
                {...props}
            >
                <CardHeader className='p-0'>
                    <div className={cn('flex-shrink-0', !showAvatar && 'invisible')}>
                        <Avatar className='h-24 w-24 ring-4 ring-offset-4 ring-offset-white dark:ring-offset-gray-900 ring-purple-500'>
                            <AvatarImage src={avatarSrc} className="object-cover" />
                            <AvatarFallback>{avatarFallback}</AvatarFallback>
                        </Avatar>
                    </div>
                    <CardDescription
                        className={cn(
                            'pt-6 text-left flex items-center gap-2 text-sm font-medium',
                            !isOnAccent && 'text-zinc-500 dark:text-zinc-400',
                            descriptionClassName
                        )}
                        style={isOnAccent ? { color: 'rgba(255,255,255,0.8)' } : {}}
                    >
                        <MapPin size={16} /> {location}
                    </CardDescription>
                    <CardTitle
                        className={cn('text-4xl font-bold tracking-tight text-left mt-3', className)}
                        style={{ ...(isOnAccent ? { color: 'white' } : {}), ...titleStyle }}
                    >
                        {name}
                    </CardTitle>
                </CardHeader>

                <CardContent className='p-0 flex-grow mt-6'>
                    <p
                        className={cn(
                            'text-lg leading-relaxed text-left font-light',
                            !isOnAccent && 'text-zinc-600 dark:text-zinc-300',
                            bioClassName
                        )}
                        style={isOnAccent ? { opacity: 0.9 } : {}}
                    >
                        {bio}
                    </p>
                </CardContent>

                {socials.length > 0 && (
                    <CardFooter className={cn('p-0 mt-8', footerClassName)}>
                        <div
                            className={cn(
                                'flex items-center gap-6',
                                !isOnAccent && 'text-gray-500 dark:text-gray-400'
                            )}
                            style={isOnAccent ? { color: 'rgba(255,255,255,0.8)' } : {}}
                        >
                            {socials.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.url}
                                    aria-label={social.label}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={cn(
                                        'transition-all duration-300 hover:scale-110',
                                        isOnAccent ? 'hover:text-white hover:opacity-100' : 'hover:text-purple-600 dark:hover:text-purple-400'
                                    )}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </CardFooter>
                )}
            </Card>
        );
    }
);
ProfileCardContent.displayName = 'ProfileCardContent';

export interface AnimatedProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
    baseCard: React.ReactNode;
    overlayCard: React.ReactNode;
    accentColor?: string;
}

export const AnimatedProfileCard = React.forwardRef<HTMLDivElement, AnimatedProfileCardProps>(
    ({ className, accentColor = '#8b5cf6', baseCard, overlayCard, ...props }, ref) => {
        const containerRef = useRef<HTMLDivElement | null>(null);
        const overlayRef = useRef<HTMLDivElement>(null);

        const setContainerRef = React.useCallback(
            (node: HTMLDivElement | null) => {
                containerRef.current = node;
                if (typeof ref === 'function') {
                    ref(node);
                } else if (ref) {
                    (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                }
            },
            [ref]
        );

        const initialClipPath = 'circle(40px at 64px 64px)';
        const hoverClipPath = 'circle(150% at 64px 64px)';

        useGSAP(
            () => {
                if (overlayRef.current) {
                    gsap.set(overlayRef.current, { clipPath: initialClipPath });
                }
            },
            { scope: containerRef }
        );

        const handleMouseEnter = () => {
            gsap.killTweensOf(overlayRef.current);
            gsap.to(overlayRef.current, {
                clipPath: hoverClipPath,
                duration: 0.7,
                ease: 'expo.inOut',
            });
        };

        const handleMouseLeave = () => {
            gsap.killTweensOf(overlayRef.current);
            gsap.to(overlayRef.current, {
                clipPath: initialClipPath,
                duration: 1.2,
                ease: 'expo.out(1, 1)',
            });
        };

        return (
            <div
                ref={setContainerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ borderColor: accentColor }}
                className={cn(
                    'relative h-[600px] w-full max-w-md mx-auto overflow-hidden rounded-3xl border-2 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20',
                    className
                )}
                {...props}
            >
                <div className='h-full w-full bg-white dark:bg-zinc-900'>{baseCard}</div>
                <div
                    ref={overlayRef}
                    className="absolute inset-0 h-full w-full"
                    style={{ backgroundColor: accentColor }}
                >
                    {overlayCard}
                </div>
            </div>
        );
    }
);
AnimatedProfileCard.displayName = 'AnimatedProfileCard';
