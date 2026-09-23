import React, { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { EngineeringHeader } from './EngineeringHeader';
import { EngineeringLayer, type LayerData } from './EngineeringLayer';
import { EngineeringPhilosophy } from './EngineeringPhilosophy';

export const Engineering: React.FC = () => {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const layers: LayerData[] = [
    {
      id: 'interface',
      number: '01 / INTERFACE',
      title: 'USER INTERACTION & CLIENT UI',
      subtitle: 'FRONTEND ARCHITECTURE',
      concepts: ['Component Architecture', 'Responsive UI', 'Routing', 'State Management', 'API Consumption'],
      nodes: [
        { name: 'React', projects: ['OpsFlow', 'ShopNest', 'SmartChain', 'Edusity'] },
        { name: 'Next.js', projects: ['Bathroom Talk'] },
        { name: 'TypeScript', projects: ['OpsFlow', 'Bathroom Talk'] },
        { name: 'Tailwind CSS', projects: ['SmartChain', 'Bathroom Talk'] },
        { name: 'Vite', projects: ['OpsFlow', 'SmartChain'] },
      ],
      flowDiagram: 'USER → COMPONENT TREE → UI STATE → HTTP REQUEST',
    },
    {
      id: 'application',
      number: '02 / APPLICATION',
      title: 'STATE & BUSINESS LOGIC',
      subtitle: 'CLIENT ENGINE',
      concepts: ['Business Logic', 'State Management', 'Form Validation', 'Route Protection', 'Data Transformation'],
      nodes: [
        { name: 'Redux Toolkit', projects: ['ShopNest'] },
        { name: 'Context API', projects: ['OpsFlow'] },
        { name: 'React Router', projects: ['SmartChain'] },
        { name: 'Electron IPC', projects: ['Valyrian Web'] },
      ],
      flowDiagram: 'EVENT → ACTION REDUCER → STATE UPDATE → RE-RENDER',
    },
    {
      id: 'server',
      number: '03 / SERVER',
      title: 'BACKEND & REST API INFRASTRUCTURE',
      subtitle: 'SERVER PIPELINE',
      concepts: ['Express Routes', 'Controllers', 'Custom Middleware', 'Req/Res Handling', 'Error Interceptors'],
      nodes: [
        { name: 'Node.js', projects: ['OpsFlow', 'ShopNest'] },
        { name: 'Express.js', projects: ['OpsFlow', 'ShopNest'] },
        { name: 'REST APIs', projects: ['OpsFlow', 'ShopNest'] },
      ],
      flowDiagram: 'CLIENT REQUEST → ROUTER → MIDDLEWARE → CONTROLLER → JSON RESPONSE',
    },
    {
      id: 'authentication',
      number: '04 / AUTHENTICATION',
      title: 'SECURITY, JWT & RBAC PERMISSIONS',
      subtitle: 'ACCESS CONTROL',
      concepts: ['JWT Verification', 'Protected Endpoints', 'Role Permissions', 'Password Hashing (bcrypt)', 'Auth Headers'],
      nodes: [
        { name: 'JWT Auth', projects: ['OpsFlow', 'ShopNest'] },
        { name: 'RBAC Matrix', projects: ['OpsFlow'] },
        { name: 'bcryptjs', projects: ['ShopNest'] },
      ],
      flowDiagram: 'LOGIN → TOKEN GENERATION → BEARER HEADER → AUTH MIDDLEWARE → GRANTED',
    },
    {
      id: 'data',
      number: '05 / DATA',
      title: 'PERSISTENCE, ORM & DATABASE ENGINE',
      subtitle: 'DATA ARCHITECTURE',
      concepts: ['Relational Schemas', 'Document Models', 'Indexes & Queries', 'Audit Logging', 'Transaction Safety'],
      nodes: [
        { name: 'PostgreSQL', projects: ['OpsFlow'] },
        { name: 'Supabase DB', projects: ['OpsFlow', 'SmartChain'] },
        { name: 'MongoDB', projects: ['ShopNest'] },
        { name: 'Mongoose ORM', projects: ['ShopNest'] },
      ],
      flowDiagram: 'DOCUMENT MODEL (ShopNest) vs RELATIONAL MODEL (OpsFlow / SmartChain)',
    },
    {
      id: 'integrations',
      number: '06 / INTEGRATIONS',
      title: 'EXTERNAL SERVICES & UTILITIES',
      subtitle: 'SDK INTEGRATIONS',
      concepts: ['Payment Signature Validation', 'Media Cloud Uploads', 'Client-side PDF Generation', 'API Parsing'],
      nodes: [
        { name: 'Razorpay SDK', projects: ['ShopNest'] },
        { name: 'Cloudinary', projects: ['ShopNest'] },
        { name: 'jsPDF', projects: ['OpsFlow'] },
        { name: 'Google Gemini', projects: ['Valyrian Web'] },
        { name: 'DuckDuckGo API', projects: ['Valyrian Web'] },
      ],
      flowDiagram: 'APPLICATION → SECURE API CALL → EXTERNAL PROVIDER → VERIFIED RESULT',
    },
    {
      id: 'deployment',
      number: '07 / DEPLOYMENT',
      title: 'HOSTING & CI/CD PIPELINE',
      subtitle: 'PRODUCTION ECOSYSTEM',
      concepts: ['Version Control', 'Automated Build Triggers', 'Environment Variables', 'CDN Distribution'],
      nodes: [
        { name: 'Vercel', projects: ['OpsFlow', 'ShopNest', 'Bathroom Talk', 'Edusity', 'SmartChain'] },
        { name: 'Render', projects: ['OpsFlow Backend'] },
        { name: 'GitHub', projects: ['OpsFlow', 'ShopNest', 'Valyrian Web'] },
        { name: 'Electron Builder', projects: ['Valyrian Web'] },
      ],
      flowDiagram: 'GIT PUSH → GITHUB → VERCEL / RENDER BUILD → ENVIRONMENT DEPLOYMENT',
    },
  ];

  return (
    <Section id="stack" spacing="xl" bordered className="relative overflow-hidden">
      {/* Section Header */}
      <EngineeringHeader />

      {/* Connected Architecture Layers */}
      <div className="space-y-4">
        {layers.map((layer) => (
          <EngineeringLayer
            key={layer.id}
            layer={layer}
            activeTech={activeTech}
            onHoverTech={setActiveTech}
          />
        ))}
      </div>

      {/* Engineering Philosophy Micro-Concept */}
      <EngineeringPhilosophy />
    </Section>
  );
};
