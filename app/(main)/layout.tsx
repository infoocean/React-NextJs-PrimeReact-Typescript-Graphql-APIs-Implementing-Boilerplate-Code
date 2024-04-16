import { Metadata } from 'next';
import Layout from '../../layout/layout';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Mango Connect',
    description: 'A scheduling booking website is a platform that allows users to efficiently manage and schedule appointments, reservations, or bookings for various services or activities. These websites typically provide a user-friendly interface where users can view availability, select a desired date and time, and confirm their booking.',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'Mango Connect',
        url: '/',
        description: 'A scheduling booking website is a platform that allows users to efficiently manage and schedule appointments, reservations, or bookings for various services or activities. These websites typically provide a user-friendly interface where users can view availability, select a desired date and time, and confirm their booking.',
        ttl: 604800
    },
    icons: {
        icon: '/favicon.ico'
    }
};

export default function AppLayout({ children }: AppLayoutProps) {
    return <Layout>{children}</Layout>;
}
