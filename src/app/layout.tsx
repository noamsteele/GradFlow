import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'GradFlow — Discover Your Global Master\'s Degree',
    description: 'GradFlow helps UBCO Business Management graduates discover and match with top Master\'s programs in Europe, UK, and Australia. Free, mobile-first, and tailored to your profile.',
    keywords: 'Masters degree, UBCO, UBC Okanagan, post-graduate, Europe, UK, Australia, business school, MBA, management',
    authors: [{ name: 'GradFlow' }],
    openGraph: {
        title: 'GradFlow — Your Global Post-Graduate Compass',
        description: 'Discover perfectly matched Master\'s programs worldwide based on your UBCO degree and GPA.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'GradFlow',
        description: 'Discover your perfect global Master\'s program.',
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#080c14',
    viewportFit: 'cover',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="apple-mobile-web-app-title" content="GradFlow" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}
