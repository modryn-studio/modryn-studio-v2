import Hero from '@/components/hero';
import ToolsGrid from '@/components/tools-grid';
import BuildLog from '@/components/build-log';
import EmailSignup from '@/components/email-signup';

export default function Home() {
  return (
    <>
      <Hero />
      <ToolsGrid />
      <BuildLog />
      <EmailSignup />
    </>
  );
}
