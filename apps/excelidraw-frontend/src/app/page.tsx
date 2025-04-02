
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import CTA from '../components/sections/CTA';
import Layout from '../components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <main> 
        <Hero />
        <Features />
        <CTA />
      </main>
    </Layout>
  );
}