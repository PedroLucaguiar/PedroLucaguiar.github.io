'use client'

import { createContext, useContext, useMemo, useState } from 'react'

export type Language = 'pt' | 'en'

export const content = {
  pt: {
    nav: [
      { label: 'Sobre', href: '#sobre' },
      { label: 'Trajetória', href: '#trajetoria' },
      { label: 'Competências', href: '#competencias' },
      { label: 'Projetos', href: '#projetos' },
      { label: 'Contato', href: '#contato' },
    ],
    hero: {
      meta: 'Programador Pleno · Front-end, ERP, Mobile & Automação',
      value: 'Construo produtos corporativos completos: ERP web, apps mobile, integrações e automações para operações complexas.',
      primaryCta: 'Ver Projetos',
      secondaryCta: 'Falar comigo',
      scroll: 'Scroll',
    },
    about: {
      eyebrow: '01 — Sobre',
      title: 'Sobre Mim',
      paragraphs: [
        'Sou Pedro Lucas Aguiar, Programador Pleno focado em produtos corporativos. Trabalho na ponte entre front-end moderno, arquitetura de módulos ERP, apps mobile e automações que reduzem operação manual.',
        'Minha experiência combina React, Next.js, TypeScript, React Native, Expo, Python, Node.js, PostgreSQL e Power BI para transformar fluxos internos complexos em sistemas claros, performáticos e mensuráveis.',
      ],
      facts: [
        { label: '4+ anos', description: 'de experiência' },
        { label: 'ERP + Mobile', description: 'produtos completos' },
        { label: 'PT / EN', description: 'perfil internacional' },
      ],
    },
    timeline: {
      eyebrow: '02 — Trajetória',
      title: 'Minha Jornada',
      items: [
        {
          period: 'Set 2025 – Atual',
          company: 'NXOS Consultoria e Desenvolvimento',
          role: 'Programador Pleno · Front-end, ERP & Mobile',
          description:
            'Atuei na construção do ecossistema NXOS ERP: Hub multiempresa, módulos de RH/PeopleSync, FieldOps/4Lists, medição/faturamento, integrações REST e dois apps mobile para cliente e colaborador de campo.',
          stack: ['Next.js', 'React', 'TypeScript', 'React Native', 'Expo', 'Django REST', 'PostgreSQL', 'Docker'],
        },
        {
          period: 'Fev 2025 – Set 2025',
          company: 'Austral Engenharia',
          role: 'Engenheiro de Automação & Sistemas',
          description:
            'Mapeei gargalos financeiros ligados a BMs, notas fiscais e relatórios gerenciais. Desenvolvi rotinas em Python e Node.js, integrei dados do ERP e publiquei dashboards em Power BI, reduzindo retrabalho manual e erros de digitação no ciclo de faturamento.',
          stack: ['Python', 'Node.js', 'Power BI', 'REST APIs', 'ETL', 'PostgreSQL'],
        },
        {
          period: 'Abr 2024 – Set 2025',
          company: 'Conterp Oil and Gas',
          role: 'Desenvolvedor de Software Junior',
          description:
            'Atuei no ERP interno e em processos operacionais do setor petrolífero. Automatizei manipulação de dados, geração de relatórios e integração de planilhas complexas com bases corporativas, dando mais confiabilidade a rotinas repetitivas.',
          stack: ['Python', 'JavaScript', 'Node.js', 'Excel Avançado', 'SQL'],
        },
        {
          period: 'Fev 2024 – Dez 2024',
          company: 'Dtech Educacional',
          role: 'Professor de Informática e Programação',
          description:
            'Estruturei aulas práticas de Office, robótica com Arduino, web e mobile para alunos em formação técnica, conectando fundamentos de programação com projetos aplicáveis.',
          stack: ['Arduino', 'Web', 'Mobile'],
        },
        {
          period: 'Ago 2021 – Out 2023',
          company: 'Colégio Antoni Gaudí',
          role: 'Técnico de T.I.',
          description:
            'Mantive infraestrutura, suporte técnico e melhorias internas, criando base prática em diagnóstico, atendimento a usuários e automações de rotina.',
          stack: ['Suporte', 'Automação', 'Infraestrutura'],
        },
        {
          period: '2020 – 2024',
          company: 'Instituto Federal Baiano',
          role: 'ADS — Formação Acadêmica',
          description:
            'Formação em Análise e Desenvolvimento de Sistemas, com projetos acadêmicos em IA, robótica e publicação em coletânea oficial.',
          stack: ['IA', 'Robótica', 'Pesquisa'],
        },
      ],
    },
    skills: {
      eyebrow: '03 — Competências',
      title: 'Habilidades',
      categories: [
        {
          name: 'Front-End & ERP',
          skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Dashboards', 'Performance', 'UX/UI'],
        },
        {
          name: 'Automação & Scripting',
          skills: ['Python', 'Node.js', 'Bots', 'ETL', 'Integrações API', 'Django REST'],
        },
        {
          name: 'Engenharia de Dados & BI',
          skills: ['Power BI', 'PostgreSQL', 'Pandas', 'Dashboards', 'SQL', 'Relatórios Gerenciais'],
        },
        {
          name: 'Produto, ERP & Mobile',
          skills: ['Design Systems', 'Componentização', 'Fluxos de aprovação', 'ERPs', 'React Native', 'Expo'],
        },
        {
          name: 'DevOps & Qualidade',
          skills: ['Git', 'GitHub', 'Docker', 'APIs REST', 'Scrum/Agile', 'Code Review'],
        },
        {
          name: 'Produtividade Corporativa',
          skills: ['Excel Avançado', 'Automação de Planilhas', 'Process Mining', 'Documentos Fiscais'],
        },
      ],
    },
    projects: {
      eyebrow: '04 — Projetos',
      title: 'Showcase de Impacto',
      hint: 'Arraste para ver mais',
      more: 'Ver estudo',
      modalCta: 'Abrir demo',
      labels: {
        problem: 'Problema do Negócio',
        solution: 'Minha Solução',
        impact: 'Impacto',
        technologies: 'Tecnologias',
        gallery: 'Galeria',
      },
      items: [
        {
          id: 'support-nxos',
          title: 'NXOS Support',
          company: 'NXOS',
          description:
            'Sistema de suporte e chamados para centralizar solicitações, acompanhamento e comunicação operacional.',
          problem:
            'Solicitações de suporte precisavam sair de conversas soltas e ganhar rastreio, status, histórico e visibilidade para cliente e equipe interna.',
          solution:
            'Desenvolvi uma interface web de suporte com autenticação, visão de chamados, organização por status e experiência focada em acompanhamento rápido.',
          impact:
            'Melhorou a rastreabilidade do atendimento e reduziu perda de contexto entre abertura, análise e retorno.',
          stack: ['Next.js', 'React', 'TypeScript', 'Django REST', 'PostgreSQL', 'UX/UI'],
          images: ['/projects/support/1.webp', '/projects/support/2.webp', '/projects/support/3.webp'],
          url: 'https://support.nxosbr.com/',
        },
        {
          id: 'peoplesync-nxos',
          title: 'PeopleSync · RH, Ponto & Jornada',
          company: 'NXOS',
          description:
            'Módulo de RH operacional para funcionários, vínculos, batidas de ponto, jornada, validação e revisão de cobrança.',
          problem:
            'A empresa precisava cruzar colaboradores, planejamento de equipe, execução em campo, ponto e critérios de cobrança sem transformar o ERP em um RH genérico.',
          solution:
            'Desenvolvi telas e fluxos de colaboradores, identidades, conflitos, punches, validação de horas, políticas de carga, pendências e revisão manual.',
          impact:
            'Criou uma ponte auditável entre RH operacional, ponto, execução e faturamento, com mais controle sobre horas validadas e itens medíveis.',
          stack: ['Next.js', 'React', 'TypeScript', 'Django REST', 'PostgreSQL', 'APIs REST'],
          images: ['/projects/rh/peoplesync-policies.webp', '/projects/rh/peoplesync-calendar.webp', '/projects/rh/3.webp'],
          url: 'https://dev.nxoserp.com/login/',
        },
        {
          id: 'fieldops-nxos',
          title: 'FieldOps · Planejador Operacional',
          company: 'NXOS',
          description:
            'Planejador de atividades de campo com equipes, materiais, veículos, formulários, relatórios e aprovações.',
          problem:
            'A operação precisava planejar serviços, alocar equipe e recursos, controlar execução e gerar relatórios sem quebrar o fluxo entre escritório e campo.',
          solution:
            'Construí telas de solicitação, atividades, planejamento, formulários dinâmicos, RDS, aprovações, permissões e integração com os apps mobile.',
          impact:
            'Criou um ciclo completo entre escritório e campo: serviço solicitado, planejado, executado, revisado, assinado e pronto para medição.',
          stack: ['Next.js', 'React', 'TypeScript', 'Django REST', 'Firebase', 'UX/UI'],
          images: ['/projects/fieldops/report-team.webp', '/projects/fieldops/2.webp', '/projects/fieldops/schedule-rule.webp'],
          url: 'https://dev.nxoserp.com/login/',
        },
        {
          id: 'medicao-nxos',
          title: 'Medição · MR',
          company: 'NXOS',
          description:
            'Projeto MR para Boletins de Medição, clientes, contratos, objetos de cobrança, agendas e templates Excel.',
          problem:
            'Boletins de Medição, RDS, itens contratuais e evidências financeiras exigiam consolidação manual e regras difíceis de auditar.',
          solution:
            'Implementei interfaces para navegação de BMs, configuração de competências, clientes, contratos, objetos de cobrança, exportações Excel e integração com dados operacionais.',
          impact:
            'Deu rastreabilidade ao caminho entre execução em campo, validação, cobrança e fechamento financeiro, reduzindo erro operacional.',
          stack: ['Next.js', 'React', 'TypeScript', 'ExcelJS', 'Power BI', 'REST APIs'],
          images: ['/projects/medicao/calendar-safe.webp', '/projects/medicao/bm-config-safe.webp', '/projects/medicao/3.webp'],
          url: 'https://dev.nxoserp.com/login/',
        },
        {
          id: 'app-colab-nxos',
          title: 'App Colaborador NXOS',
          company: 'NXOS',
          description:
            'Aplicativo mobile para colaborador de campo acompanhar atividades, preencher RDS, anexar evidências e enviar relatórios.',
          problem:
            'O colaborador precisava executar a operação em campo sem depender de desktop, mensagens soltas ou preenchimento posterior.',
          solution:
            'Implementei app em React Native/Expo com login, seleção de empresa, atividades em campo, formulários, evidências por foto, assinatura e notificações.',
          impact:
            'Levou o fluxo de execução para o celular e aproximou operação, evidências, relatórios e backoffice em tempo real.',
          stack: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'SSE', 'REST APIs'],
          images: ['/projects/nxos-mobile/appcolab-home.webp', '/projects/nxos-mobile/appcolab-report-measurables.webp', '/projects/nxos-mobile/appcolab-report-selected-new.webp'],
        },
        {
          id: 'app-client-nxos',
          title: 'App Cliente NXOS',
          company: 'NXOS',
          description:
            'Aplicativo mobile para clientes abrirem solicitações, acompanharem atividades, consultarem relatórios e assinarem documentos.',
          problem:
            'O cliente precisava acompanhar a operação e assinar relatórios sem depender de e-mail, PDF manual ou retorno do backoffice.',
          solution:
            'Criei app em React Native/Expo com autenticação, desbloqueio local, solicitações, documentos, assinatura digital, notificações push e eventos em tempo real.',
          impact:
            'Reduziu atrito entre cliente e operação, trazendo consulta, aceite e assinatura para um fluxo mobile simples.',
          stack: ['React Native', 'Expo', 'TypeScript', 'SecureStore', 'Firebase', 'REST APIs'],
          images: ['/projects/nxos-mobile/appclient-login-background.webp', '/projects/nxos-mobile/appclient-release-screen.webp', '/projects/nxos-mobile/appclient-after-company.webp'],
        },
        {
          id: 'careers-nxos',
          title: 'NXOS Careers',
          company: 'NXOS',
          description:
            'Plataforma de vagas e recrutamento com experiência moderna para candidatos e gestão interna.',
          problem:
            'O processo de divulgação e triagem precisava de uma interface própria, mais organizada e adequada à marca NXOS.',
          solution:
            'Desenvolvi a experiência web de carreira, com páginas de vagas, fluxo de candidatura e organização visual para leitura rápida.',
          impact:
            'Melhorou a presença digital de recrutamento e deixou o processo mais claro para candidatos e equipe.',
          stack: ['React', 'Next.js', 'TypeScript', 'Django REST', 'UX/UI'],
          images: ['/projects/careers/1.webp', '/projects/careers/2.webp', '/projects/careers/3.webp'],
          url: 'https://careers.nxosbr.com/',
        },
        {
          id: 'hub-nxos',
          title: 'Hub NXOS',
          company: 'NXOS',
          description:
            'Hub multiempresa para seleção de empresa, controle de acesso, gestão de módulos e entrada central nos sistemas NXOS.',
          problem:
            'Usuários precisavam navegar entre sistemas diferentes com contexto de empresa, permissões e módulos disponíveis de forma consistente.',
          solution:
            'Construí a experiência de Hub com autenticação, seleção de empresa, cards de módulos, permissões por acesso e rotas integradas entre sistemas.',
          impact:
            'Centralizou a entrada do ecossistema NXOS e deixou o acesso aos módulos mais claro, controlado e escalável.',
          stack: ['Next.js', 'React', 'TypeScript', 'Django REST', 'Auth', 'UX/UI'],
          images: ['/projects/hub/1.webp', '/projects/hub/2.webp', '/projects/hub/3.webp'],
          url: 'https://dev.nxoserp.com/login/',
        },
      ],
    },
    gallery: {
      eyebrow: 'Galeria',
      title: 'Galeria de Interfaces',
      expand: 'Ampliar',
    },
    contact: {
      eyebrow: '05 — Contato',
      title: 'Vamos construir algo juntos.',
      location: 'Salvador, BA — Brasil',
      availability: 'Disponível para projetos',
      rights: 'Todos os direitos reservados.',
    },
  },
  en: {
    nav: [
      { label: 'About', href: '#sobre' },
      { label: 'Journey', href: '#trajetoria' },
      { label: 'Skills', href: '#competencias' },
      { label: 'Projects', href: '#projetos' },
      { label: 'Contact', href: '#contato' },
    ],
    hero: {
      meta: 'Mid-Level Developer · Front-end, ERP, Mobile & Automation',
      value: 'I build complete business products: web ERP, mobile apps, integrations and automation for complex operations.',
      primaryCta: 'View Projects',
      secondaryCta: 'Contact me',
      scroll: 'Scroll',
    },
    about: {
      eyebrow: '01 — About',
      title: 'About Me',
      paragraphs: [
        'I am Pedro Lucas Aguiar, a Mid-Level Developer focused on business products. I work where modern front-end engineering, ERP module architecture, mobile apps and automation meet.',
        'My experience combines React, Next.js, TypeScript, React Native, Expo, Python, Node.js, PostgreSQL and Power BI to turn complex internal operations into clear, performant and measurable systems.',
      ],
      facts: [
        { label: '4+ years', description: 'of experience' },
        { label: 'ERP + Mobile', description: 'complete products' },
        { label: 'PT / EN', description: 'international profile' },
      ],
    },
    timeline: {
      eyebrow: '02 — Journey',
      title: 'My Journey',
      items: [
        {
          period: 'Sep 2025 – Present',
          company: 'NXOS Consulting and Development',
          role: 'Mid-Level Developer · Front-end, ERP & Mobile',
          description:
            'I worked on the NXOS ERP ecosystem: multi-company Hub, HR/PeopleSync, FieldOps/4Lists, measurement/billing, REST integrations and two mobile apps for clients and field collaborators.',
          stack: ['Next.js', 'React', 'TypeScript', 'React Native', 'Expo', 'Django REST', 'PostgreSQL', 'Docker'],
        },
        {
          period: 'Feb 2025 – Sep 2025',
          company: 'Austral Engenharia',
          role: 'Automation & Systems Engineer',
          description:
            'I mapped financial bottlenecks around measurement bulletins, invoices and management reporting. I built Python and Node.js routines, integrated ERP data and published Power BI dashboards to reduce manual work and typing errors.',
          stack: ['Python', 'Node.js', 'Power BI', 'REST APIs', 'ETL', 'PostgreSQL'],
        },
        {
          period: 'Apr 2024 – Sep 2025',
          company: 'Conterp Oil and Gas',
          role: 'Junior Software Developer',
          description:
            'I worked on the internal ERP and operational processes in the oil and gas sector. I automated data handling, reporting and spreadsheet integration with corporate databases, making recurring workflows more reliable.',
          stack: ['Python', 'JavaScript', 'Node.js', 'Advanced Excel', 'SQL'],
        },
        {
          period: 'Feb 2024 – Dec 2024',
          company: 'Dtech Educacional',
          role: 'IT and Programming Instructor',
          description:
            'I structured practical classes in Office, Arduino robotics, web and mobile development, connecting programming fundamentals to applicable student projects.',
          stack: ['Arduino', 'Web', 'Mobile'],
        },
        {
          period: 'Aug 2021 – Oct 2023',
          company: 'Colégio Antoni Gaudí',
          role: 'IT Technician',
          description:
            'I supported infrastructure, users and internal improvements, building practical experience in diagnostics, service workflows and routine automation.',
          stack: ['Support', 'Automation', 'Infrastructure'],
        },
        {
          period: '2020 – 2024',
          company: 'Instituto Federal Baiano',
          role: 'Systems Analysis and Development',
          description:
            'Academic foundation in software development, with projects in AI, robotics and publication in an official collection.',
          stack: ['AI', 'Robotics', 'Research'],
        },
      ],
    },
    skills: {
      eyebrow: '03 — Skills',
      title: 'Core Skills',
      categories: [
        {
          name: 'Front-End & ERP',
          skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Dashboards', 'Performance', 'UX/UI'],
        },
        {
          name: 'Automation & Scripting',
          skills: ['Python', 'Node.js', 'Bots', 'ETL', 'API Integrations', 'Django REST'],
        },
        {
          name: 'Data Engineering & BI',
          skills: ['Power BI', 'PostgreSQL', 'Pandas', 'Dashboards', 'SQL', 'Management Reports'],
        },
        {
          name: 'Product, ERP & Mobile',
          skills: ['Design Systems', 'Componentization', 'Approval Flows', 'ERPs', 'React Native', 'Expo'],
        },
        {
          name: 'DevOps & Quality',
          skills: ['Git', 'GitHub', 'Docker', 'REST APIs', 'Scrum/Agile', 'Code Review'],
        },
        {
          name: 'Business Productivity',
          skills: ['Advanced Excel', 'Spreadsheet Automation', 'Process Mining', 'Fiscal Documents'],
        },
      ],
    },
    projects: {
      eyebrow: '04 — Projects',
      title: 'Impact Showcase',
      hint: 'Drag to see more',
      more: 'View case',
      modalCta: 'Open demo',
      labels: {
        problem: 'Business Problem',
        solution: 'My Solution',
        impact: 'Impact',
        technologies: 'Technologies',
        gallery: 'Gallery',
      },
      items: [
        {
          id: 'support-nxos',
          title: 'NXOS Support',
          company: 'NXOS',
          description:
            'Support and ticketing system to centralize requests, tracking and operational communication.',
          problem:
            'Support requests needed to move away from scattered conversations and gain tracking, status, history and visibility for clients and internal teams.',
          solution:
            'I developed a web support interface with authentication, ticket views, status organization and an experience focused on fast follow-up.',
          impact:
            'Improved service traceability and reduced context loss between request creation, analysis and response.',
          stack: ['Next.js', 'React', 'TypeScript', 'Django REST', 'PostgreSQL', 'UX/UI'],
          images: ['/projects/support/1.webp', '/projects/support/2.webp', '/projects/support/3.webp'],
          url: 'https://support.nxosbr.com/',
        },
        {
          id: 'peoplesync-nxos',
          title: 'PeopleSync · HR, Punches & Workload',
          company: 'NXOS',
          description:
            'Operational HR module for employees, links, punch data, workload, validation and billing review.',
          problem:
            'The company needed to connect collaborators, team planning, field execution, punches and billing criteria without turning the ERP into a generic HR system.',
          solution:
            'I developed screens and flows for collaborators, identities, conflicts, punches, hour validation, workload policies, pending issues and manual review.',
          impact:
            'Created an auditable bridge between operational HR, punches, execution and billing, with more control over validated hours and measurable items.',
          stack: ['Next.js', 'React', 'TypeScript', 'Django REST', 'PostgreSQL', 'REST APIs'],
          images: ['/projects/rh/peoplesync-policies.webp', '/projects/rh/peoplesync-calendar.webp', '/projects/rh/3.webp'],
          url: 'https://dev.nxoserp.com/login/',
        },
        {
          id: 'fieldops-nxos',
          title: 'FieldOps · Operational Planner',
          company: 'NXOS',
          description:
            'Field activity planner with teams, materials, vehicles, forms, reports and approvals.',
          problem:
            'The operation needed to plan services, allocate teams and resources, control execution and generate reports without breaking the office-to-field flow.',
          solution:
            'I built request, activity, planning, dynamic form, RDS, approval, permission and mobile-app integration screens.',
          impact:
            'Created a complete loop between office and field: requested, planned, executed, reviewed, signed and ready for measurement.',
          stack: ['Next.js', 'React', 'TypeScript', 'Django REST', 'Firebase', 'UX/UI'],
          images: ['/projects/fieldops/report-team.webp', '/projects/fieldops/2.webp', '/projects/fieldops/schedule-rule.webp'],
          url: 'https://dev.nxoserp.com/login/',
        },
        {
          id: 'medicao-nxos',
          title: 'Measurement · MR',
          company: 'NXOS',
          description:
            'MR project for measurement bulletins, clients, contracts, billing objects, schedules and Excel templates.',
          problem:
            'Measurement bulletins, RDS data, contract items and financial evidence required manual consolidation and rules that were difficult to audit.',
          solution:
            'I implemented interfaces for BM navigation, competence setup, clients, contracts, billing objects, Excel exports and operational-data integration.',
          impact:
            'Gave traceability to the path between field execution, validation, billing and financial closing, reducing operational error.',
          stack: ['Next.js', 'React', 'TypeScript', 'ExcelJS', 'Power BI', 'REST APIs'],
          images: ['/projects/medicao/calendar-safe.webp', '/projects/medicao/bm-config-safe.webp', '/projects/medicao/3.webp'],
          url: 'https://dev.nxoserp.com/login/',
        },
        {
          id: 'app-colab-nxos',
          title: 'NXOS Collaborator App',
          company: 'NXOS',
          description:
            'Mobile app for field collaborators to track activities, fill RDS reports, attach evidence and submit reports.',
          problem:
            'Collaborators needed to execute field operations without relying on desktop, scattered messages or later rework.',
          solution:
            'I implemented a React Native/Expo app with login, company selection, field activities, forms, photo evidence, signatures and notifications.',
          impact:
            'Brought execution to mobile and connected operation, evidence, reports and backoffice in real time.',
          stack: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'SSE', 'REST APIs'],
          images: ['/projects/nxos-mobile/appcolab-home.webp', '/projects/nxos-mobile/appcolab-report-measurables.webp', '/projects/nxos-mobile/appcolab-report-selected-new.webp'],
        },
        {
          id: 'app-client-nxos',
          title: 'NXOS Client App',
          company: 'NXOS',
          description:
            'Mobile app for clients to open requests, track activities, review reports and sign documents.',
          problem:
            'Clients needed to follow operations and sign reports without relying on email, manual PDFs or backoffice replies.',
          solution:
            'I built a React Native/Expo app with authentication, local unlock, requests, documents, digital signatures, push notifications and real-time events.',
          impact:
            'Reduced friction between client and operation by bringing review, approval and signature into a simple mobile flow.',
          stack: ['React Native', 'Expo', 'TypeScript', 'SecureStore', 'Firebase', 'REST APIs'],
          images: ['/projects/nxos-mobile/appclient-login-background.webp', '/projects/nxos-mobile/appclient-release-screen.webp', '/projects/nxos-mobile/appclient-after-company.webp'],
        },
        {
          id: 'careers-nxos',
          title: 'NXOS Careers',
          company: 'NXOS',
          description:
            'Jobs and recruiting platform with a modern experience for candidates and internal management.',
          problem:
            'The hiring process needed a dedicated interface, better organized and aligned with the NXOS brand.',
          solution:
            'I developed the careers web experience with job pages, application flow and visual organization for fast scanning.',
          impact:
            'Improved the recruiting digital presence and made the process clearer for candidates and the team.',
          stack: ['React', 'Next.js', 'TypeScript', 'Django REST', 'UX/UI'],
          images: ['/projects/careers/1.webp', '/projects/careers/2.webp', '/projects/careers/3.webp'],
          url: 'https://careers.nxosbr.com/',
        },
        {
          id: 'hub-nxos',
          title: 'NXOS Hub',
          company: 'NXOS',
          description:
            'Multi-company hub for company selection, access control, module management and central entry into NXOS systems.',
          problem:
            'Users needed to move between different systems with company context, permissions and available modules in a consistent way.',
          solution:
            'I built the Hub experience with authentication, company selection, module cards, access permissions and integrated routes between systems.',
          impact:
            'Centralized entry into the NXOS ecosystem and made module access clearer, controlled and scalable.',
          stack: ['Next.js', 'React', 'TypeScript', 'Django REST', 'Auth', 'UX/UI'],
          images: ['/projects/hub/1.webp', '/projects/hub/2.webp', '/projects/hub/3.webp'],
          url: 'https://dev.nxoserp.com/login/',
        },
      ],
    },
    gallery: {
      eyebrow: 'Gallery',
      title: 'Interface Gallery',
      expand: 'Open',
    },
    contact: {
      eyebrow: '05 — Contact',
      title: 'Let’s build something together.',
      location: 'Salvador, BA — Brazil',
      availability: 'Available for projects',
      rights: 'All rights reserved.',
    },
  },
}

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: typeof content.pt
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt')
  const value = useMemo(() => ({ language, setLanguage, t: content[language] }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return context
}
