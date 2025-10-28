// app/layout.tsx
import { Link } from 'next/dynamic';
import { useRouter } from 'next/router';

// Custom components would be imported here in a real project
const Header = () => <div>TPharma</div>;
const Footer = () => <div>© 2025 TPharma</div>;

interface AppLayoutProps {
  authStatus: boolean;
  // TeacherPro: { [key: string]: any };
}

// Server component
export default function AppLayout({ authStatus }: AppLayoutProps) {
  const router = useRouter();

  return (
    <main>
      {/* HEADER */}
      <header className="bg-white shadow-md">
        {/* Navigation */}
        <nav className="navbar bg-white shadow">
          <div className="container max-w-7xl mx-auto px-4 py-4">
            {/* Brand */}
            <Header />
            
            {/* Navigation links */}
            {/* <div className="space-x-4 lg:space-y-0">
              <Link href="/">Home</Link>
              <Link href="/products">Products</Link>
              <Link href="/about">About</Link>
            </div> */}

            {/* Authentication Controls */}
            {authStatus ? (
              <>
                {/* Clerk/Supabase Auth Providers Header */}
                {/* [Add Clerk or Supabase auth buttons/signup here if requested] */}
                {/* <button className="btn">Sign in with Clerk</button> */}
                {/* <button className="btn">Sign in with Supabase</button> */}
              </>
            ) : (
              <div className="ml-auto">
                <Link href="/login">Log in</Link>
              </div>
            )}

            {/* Analytics Injection Point */}
            {/* [Add Google Analytics or other tracking script here if requested] */}
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Page content would be rendered here or slotted */}
        < div className="md:grid md:grid-cols-3 md:gap-8">
          <div className="md:col-span-2">
            {/* Product grid or navigation */}
          </div>
          <div className="md:col-span-8">
            {/* Main content area */}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-8">
        {/* Analytics Injection Point */}
        {/* [Add analytics script here - e.g., Google Analytics, Sentry, etc.] */}
        
        <Footer />
        
        {/* Legal/Support Links */}
        <div className="container mx-auto px-4">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </footer>
    </main>
  );
}