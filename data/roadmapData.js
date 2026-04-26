(function(){
const C={se:'#22B07D',ml:'#4AADEA',fs:'#F5A623',ai:'#A08FEE',dsa:'#E06890',prj:'#7A8A80',read:'#8A8280'};
const PL={fm:'Frontend Masters',dc:'DataCamp',ed:'Educative',bd:'Boot.dev',ms:'Microsoft',free:'Free Resource',prj:'Project',cx:'Codedex'};
const BC={fm:'bfm',dc:'bdc',ed:'bed',bd:'bbd',ms:'bms',free:'bfree',prj:'bprj',cx:'bfree'};
const TRACKS={
se:{name:'System Design / SE'},
ml:{name:'ML Engineering'},
fs:{name:'Full Stack Dev'},
ai:{name:'AI Engineering'},
dsa:{name:'DSA / Algorithms'},
prj:{name:'Build / Project'},
read:{name:'Reading / Theory'},
};
const PHASES={
1:{name:'Foundation',dates:'Apr 19 - May 16',goal:'Establish baseline consistency, lock core concepts, and produce first proof points.'},
2:{name:'Builder',dates:'May 17 - Jun 13',goal:'Increase build velocity and convert theory into weekly shipped artifacts.'},
3:{name:'Systems Thinker',dates:'Jun 14 - Jul 11',goal:'Design for scale and reliability while connecting architecture decisions to outcomes.'},
4:{name:'AI/Product Engineer',dates:'Jul 12 - Aug 8',goal:'Pair model capability with user value and ship AI-assisted product increments.'},
5:{name:'Technical Lead',dates:'Aug 9 - Sep 5',goal:'Drive architecture quality, technical direction, and team-level execution clarity.'},
6:{name:'Senior Manager Readiness',dates:'Sep 6 - Oct 3',goal:'Demonstrate roadmap ownership, communication, and delivery outcomes at org scope.'},
};
const W=[
{w:1,p:1,dates:'Apr 19-25',title:'DP-100 Exam + Roadmap Kickoff',focus:'Keep Mon-Tue focused on exam prep; sit DP-100 Apr 21, then full rotation starts',days:[
{d:'Mon',t:'se',a:'Backend System Design - FM',pl:'fm',th:'CAP theorem, reliability fundamentals, distributed system tradeoffs, fault tolerance patterns',h:'1.5h'},
{d:'Tue',t:'ml',a:'DP-100 final review session',pl:'ms',th:'Azure ML workspace, compute clusters, endpoint deployment, model monitoring configuration',h:'1.5h'},
{d:'Wed',t:'ml',a:'DP-100 EXAM @ 10pm',pl:'ms',th:'Light reading in the morning. Rest the afternoon. Exam at night.',h:'1h',exam:true},
{d:'Thu',t:'fs',a:'TypeScript 5+ Fundamentals - FM',pl:'fm',th:'Generics, utility types, discriminated unions, type narrowing, conditional types depth',h:'1.5h'},
{d:'Fri',t:'ai',a:'MCP Fundamentals for AI Agents - Educative',pl:'ed',th:'What is an AI agent? ReAct pattern, tool calling mechanics, memory types, agent loops',h:'1.5h'},
{d:'Sat',t:'dsa',a:'Boot.dev - Trees and Graphs',pl:'bd',th:'BFS, DFS, tree traversals, Big-O review, space-time tradeoff intuition',h:'1.5h'},
{d:'Sun',t:'read',a:'DDIA Chapter 1 + Karpathy Zero to Hero Ep 1',pl:'free',th:'Reliable, scalable, maintainable systems intro; backpropagation intuition from first principles',h:'1h'},
]},
{w:2,p:1,dates:'Apr 26-May 2',title:'System Design Depth + ML Acceleration',focus:'DataCamp ML track to 50%; load balancing, CDN, scaling patterns',days:[
{d:'Mon',t:'se',a:'Backend System Design cont - FM',pl:'fm',th:'Load balancing L4 vs L7, CDN strategies, horizontal vs vertical scaling, stateless service design',h:'1.5h'},
{d:'Tue',t:'ml',a:'DataCamp ML Engineer (to 50%)',pl:'dc',th:'Feature engineering pipelines, cross-validation strategies, F1/AUC-ROC/precision-recall tradeoffs',h:'1.5h'},
{d:'Wed',t:'fs',a:'API Design in Node.js v5 - FM',pl:'fm',th:'REST principles, versioning strategies, API contracts, idempotency, Fastify review',h:'1.5h'},
{d:'Thu',t:'ai',a:'AI Agents Fundamentals - FM',pl:'fm',th:'Agent loops, multi-step tool use, orchestration patterns, agent memory and state management',h:'1.5h'},
{d:'Fri',t:'dsa',a:'Boot.dev - Recursion and Dynamic Programming',pl:'bd',th:'Memoization vs tabulation, overlapping subproblems, LRU cache implementation from scratch',h:'1.5h'},
{d:'Sat',t:'prj',a:'Odysseus - Redis caching layer',pl:'prj',th:'Cache AI responses per student context using caching patterns from system design study',h:'2h'},
{d:'Sun',t:'read',a:'DDIA Ch 2 + Made with ML data engineering intro',pl:'free',th:'Relational vs document vs graph data models; data engineering fundamentals and pipeline patterns',h:'1h'},
]},
{w:3,p:1,dates:'May 3-9',title:'Patterns Deep Dive + Docker Mastery',focus:'Consistent hashing, sharding, Docker internals, gradient boosting methods',days:[
{d:'Mon',t:'se',a:'System Design Fundamentals - Educative',pl:'ed',th:'Consistent hashing ring, sharding strategies, replication, read replicas, write-ahead log',h:'1.5h'},
{d:'Tue',t:'ml',a:'DataCamp ML Engineer (to 65%)',pl:'dc',th:'Decision trees, random forests, gradient boosting: XGBoost and LightGBM internal mechanics',h:'1.5h'},
{d:'Wed',t:'fs',a:'Complete Intro to Containers - FM',pl:'fm',th:'Docker networking, volumes, multi-stage builds, compose patterns, image layer optimization',h:'1.5h'},
{d:'Thu',t:'ai',a:'Generative AI concepts - Educative',pl:'ed',th:'Transformer architecture, self-attention mechanism, tokenization, positional encoding intuition',h:'1.5h'},
{d:'Fri',t:'dsa',a:'Mastering Algorithms in Python - Educative',pl:'ed',th:'Divide and conquer, merge sort depth, binary search variations, master theorem application',h:'1.5h'},
{d:'Sat',t:'prj',a:'KombiTracker - PostGIS schema + Dockerize',pl:'prj',th:'Apply Docker plus PostGIS: geospatial route schema design, Africa\'s Talking OTP setup',h:'2h'},
{d:'Sun',t:'read',a:'The Pragmatic Programmer Ch 1-4',pl:'free',th:'DRY principle, orthogonality, tracer bullets, prototyping mindset, software entropy concept',h:'1h'},
]},
{w:4,p:1,dates:'May 10-16',title:'Event Architecture + Neural Nets Intro',focus:'Message queues, CQRS, Next.js App Router, backprop mechanics',days:[
{d:'Mon',t:'se',a:'System Design - Message Queues and Event Sourcing',pl:'ed',th:'Kafka pub/sub patterns, CQRS, event sourcing vs CRUD, at-least-once delivery guarantees',h:'1.5h'},
{d:'Tue',t:'ml',a:'DataCamp ML Engineer (to 80%)',pl:'dc',th:'Neural network basics, backpropagation step by step, activation functions, vanishing gradients',h:'1.5h'},
{d:'Wed',t:'fs',a:'Next.js Fundamentals v4 - FM',pl:'fm',th:'App Router, SSR vs SSG vs ISR, React Server Components, layouts, loading state patterns',h:'1.5h'},
{d:'Thu',t:'ai',a:'Associate AI Engineer for Developers - DataCamp',pl:'dc',th:'OpenAI API integration, embeddings, function calling, AI architecture integration patterns',h:'1.5h'},
{d:'Fri',t:'dsa',a:'Boot.dev - Graph Algorithms',pl:'bd',th:'Dijkstra, Bellman-Ford, topological sort, minimum spanning tree with Kruskal and Prim',h:'1.5h'},
{d:'Sat',t:'prj',a:'WTF Do I Eat - Next.js scaffold',pl:'prj',th:'App Router setup, Tailwind, Capacitor native build target, mood input UI component',h:'2h'},
{d:'Sun',t:'read',a:'Karpathy makemore series + fast.ai Lesson 1',pl:'free',th:'Bigram language models, neural LMs, practical deep learning from the top down',h:'1h'},
]},
{w:5,p:1,dates:'May 17-23',title:'ML Track Sprint + RAG Architecture',focus:'DataCamp ML to 95%; MLOps concepts; vector stores and semantic search',days:[
{d:'Mon',t:'se',a:'System Design - Database Selection and Indexing',pl:'ed',th:'SQL vs NoSQL decision framework, B-tree vs LSM tree indexes, EXPLAIN ANALYZE, query plans',h:'1.5h'},
{d:'Tue',t:'ml',a:'DataCamp ML Engineer (to 95%)',pl:'dc',th:'MLOps intro: model serving, monitoring, drift detection, CI/CD pipelines for ML workflows',h:'1.5h'},
{d:'Wed',t:'fs',a:'Intermediate Next.js - FM',pl:'fm',th:'Server actions, RSC streaming, Suspense, partial prerendering, parallel and intercepted routes',h:'1.5h'},
{d:'Thu',t:'ai',a:'Associate AI Engineer - RAG architecture',pl:'dc',th:'Vector stores, semantic search, RAG pipeline design, chunking strategies, reranking basics',h:'1.5h'},
{d:'Fri',t:'dsa',a:'Boot.dev - Sorting and Hash Tables',pl:'bd',th:'QuickSort, HeapSort analysis, hash collision resolution, open addressing vs chaining tradeoffs',h:'1.5h'},
{d:'Sat',t:'prj',a:'Odysseus - AI tutoring suggestion feature',pl:'prj',th:'OpenAI embeddings plus pgvector: context-aware tutoring prompts generated per student topic',h:'2h'},
{d:'Sun',t:'read',a:'DDIA Ch 3 (Storage and Retrieval) + Simon Willison blog',pl:'free',th:'LSM trees vs B-trees, SSTables, Bloom filters; LLM tool use patterns in production systems',h:'1h'},
]},
{w:6,p:1,dates:'May 24-30',title:'Phase 1 Capstone + Internship Final Week',focus:'DataCamp ML Engineer CERT. Ship KombiTracker v0.1. Phase retro.',days:[
{d:'Mon',t:'se',a:'System Design Interview Cases - Educative',pl:'ed',th:'Design URL shortener and rate limiter as architectural case studies not interview prep',h:'1.5h'},
{d:'Tue',t:'ml',a:'DataCamp ML Engineer - 100% and CERT',pl:'dc',th:'Final certification exam. Post to LinkedIn immediately. Screenshot and tweet it.',h:'2h'},
{d:'Wed',t:'fs',a:'Build a Fullstack Next.js App - FM',pl:'fm',th:'End-to-end type safety with Zod, server actions, tRPC patterns, database wiring',h:'1.5h'},
{d:'Thu',t:'ai',a:'Prompt engineering depth - Anthropic docs',pl:'free',th:'Chain-of-thought, few-shot examples, structured outputs, system prompt design, safety',h:'1.5h'},
{d:'Fri',t:'dsa',a:'Boot.dev - final assessments and pattern review',pl:'bd',th:'All DSA patterns: complexity analysis, pattern recognition across problem categories',h:'1.5h'},
{d:'Sat',t:'prj',a:'KombiTracker v0.1 - deploy and ship',pl:'prj',th:'Ship it even rough. Real users. Real feedback. Momentum matters more than polish.',h:'2h'},
{d:'Sun',t:'read',a:'Chip Huyen AI Engineering Ch 1-2 + Phase 1 retro',pl:'free',th:'AI engineering vs ML engineering distinction; write your Phase 1 retrospective document',h:'1h'},
]},
{w:7,p:2,dates:'Jun 1-7',title:'Post-Internship Lockdown Begins',focus:'9-10 hrs/week now available. Cloud infrastructure and MLOps depth.',days:[
{d:'Mon',t:'se',a:'Cloud Infrastructure Startup to Scale - FM',pl:'fm',th:'Multi-region architecture, autoscaling policies, CDN config, cost modeling, DO vs AWS tradeoffs',h:'2h'},
{d:'Tue',t:'ml',a:'Machine Learning Scientist in Python - DC',pl:'dc',th:'Supervised learning depth: SVMs, ensemble stacking, advanced feature selection techniques',h:'2h'},
{d:'Wed',t:'fs',a:'Fullstack TypeScript with Zod - FM',pl:'fm',th:'End-to-end type safety, Zod schema inference, tRPC setup, runtime validation patterns',h:'2h'},
{d:'Thu',t:'ai',a:'Associate AI Engineer for Data Scientists - DC',pl:'dc',th:'Fine-tuning LLMs, LoRA concepts, Hugging Face ecosystem overview, model evaluation methods',h:'2h'},
{d:'Fri',t:'dsa',a:'Mastering Algorithms in C++ - Educative',pl:'ed',th:'Pointers, memory management, STL containers, template classes, iterator design patterns',h:'1.5h'},
{d:'Sat',t:'prj',a:'Odysseus - per-user rate limiting on AI endpoints',pl:'prj',th:'Redis sliding window counter per user. Fix the security gap identified in the audit.',h:'2h'},
{d:'Sun',t:'read',a:'DDIA Ch 5-6 (Replication and Partitioning)',pl:'free',th:'Leader-follower replication, consistency models, range vs hash partitioning strategies',h:'1h'},
]},
{w:8,p:2,dates:'Jun 8-14',title:'Kubernetes + ML Model Serving',focus:'Container orchestration, deploy ML inference APIs, React state architecture',days:[
{d:'Mon',t:'se',a:'Kubernetes Workshop - FM',pl:'fm',th:'Pods, Deployments, Services, Ingress, ConfigMaps, Secrets, resource limits, HPA autoscaling',h:'2h'},
{d:'Tue',t:'ml',a:'ML deployment - FastAPI + Docker + model serving',pl:'free',th:'FastAPI inference endpoint, ONNX export, model optimization for serving latency, health checks',h:'2h'},
{d:'Wed',t:'fs',a:'State Management at Scale - FM',pl:'fm',th:'React Query, Zustand, server vs client state boundary, optimistic updates, stale-while-revalidate',h:'2h'},
{d:'Thu',t:'ai',a:'Hugging Face transformers - fine-tuning in practice',pl:'free',th:'Dataset prep, LoRA and QLoRA config, PEFT library, training loop, checkpoint management',h:'2h'},
{d:'Fri',t:'dsa',a:'Data Structures Generic Types in C++ - Educative',pl:'ed',th:'Skip lists, AVL tree rotations, template specialization, custom allocators, STL internals',h:'1.5h'},
{d:'Sat',t:'prj',a:'Deploy ML inference API to DigitalOcean',pl:'prj',th:'FastAPI plus Docker on DO App Platform: HTTPS, env vars, monitoring endpoint, rollback',h:'2h'},
{d:'Sun',t:'read',a:'fast.ai Lessons 3-4 + Designing ML Systems Ch 1',pl:'free',th:'Collaborative filtering, tabular data models; ML system design scope and framing',h:'1h'},
]},
{w:9,p:2,dates:'Jun 15-21',title:'Distributed Systems + Deep Learning Math',focus:'Raft consensus, Karpathy nanoGPT from scratch, React profiling',days:[
{d:'Mon',t:'se',a:'Distributed Systems Theory - DDIA + papers',pl:'free',th:'Raft consensus, Paxos overview, linearizability vs eventual consistency, vector clocks',h:'2h'},
{d:'Tue',t:'ml',a:'Deep learning - Karpathy nanoGPT series',pl:'free',th:'Attention from scratch, transformer in ~300 lines of Python, cross-entropy loss derivation',h:'2h'},
{d:'Wed',t:'fs',a:'React Performance v2 - FM',pl:'fm',th:'React DevTools profiler, memo boundaries, useMemo and useCallback, code splitting strategies',h:'2h'},
{d:'Thu',t:'ai',a:'Vector databases - pgvector and Pinecone concepts',pl:'free',th:'Embedding types, cosine similarity math, HNSW index structure, ANN search tradeoffs',h:'2h'},
{d:'Fri',t:'dsa',a:'Advanced trees - AVL, Red-Black, Heaps',pl:'bd',th:'Rotation mechanics, heap property maintenance, priority queue apps, heapify algorithm',h:'1.5h'},
{d:'Sat',t:'prj',a:'Odysseus - pgvector for tutoring context retrieval',pl:'prj',th:'Semantic search over past sessions; surface relevant curriculum per student topic automatically',h:'2h'},
{d:'Sun',t:'read',a:'"Attention Is All You Need" summary + DDIA Ch 7',pl:'free',th:'Transformer key ideas: multi-head attention, positional encoding; ACID and isolation levels',h:'1h'},
]},
{w:10,p:2,dates:'Jun 22-28',title:'Data Engineering + LangChain RAG',focus:'ETL pipelines, feature stores, DVC, LangChain chains and retrievers',days:[
{d:'Mon',t:'se',a:'Data Engineer in Python - DC selected modules',pl:'dc',th:'ETL pipeline design, Airflow DAG patterns, data quality checks, orchestration architecture',h:'2h'},
{d:'Tue',t:'ml',a:'Feature stores, DVC, training pipeline design',pl:'free',th:'Data versioning, feature drift, training vs serving skew prevention, pipeline reproducibility',h:'2h'},
{d:'Wed',t:'fs',a:'Auth patterns depth - OAuth 2.0 and JWT internals',pl:'fm',th:'Authorization code flow, PKCE, refresh token rotation, JWK sets, secure session management',h:'2h'},
{d:'Thu',t:'ai',a:'LangChain fundamentals - chains, agents, RAG',pl:'free',th:'Document loaders, retriever types, memory patterns, conversational RAG, LCEL syntax',h:'2h'},
{d:'Fri',t:'dsa',a:'Dynamic programming mastery - LeetCode medium',pl:'free',th:'Knapsack variations, LCS, coin change, DP on trees, interval DP pattern library',h:'1.5h'},
{d:'Sat',t:'prj',a:'Odysseus - RAG system for tutoring knowledge base',pl:'prj',th:'LangChain plus pgvector plus Fastify endpoint: context-aware tutoring from curriculum docs',h:'2h'},
{d:'Sun',t:'read',a:'Chip Huyen AI Engineering Ch 3-4 + DDIA Ch 8',pl:'free',th:'Model evaluation methodology, AI system reliability; distributed failure modes and recovery',h:'1h'},
]},
{w:11,p:2,dates:'Jun 29-Jul 5',title:'Event-Driven Depth + LLMOps',focus:'Outbox pattern, saga pattern, MLflow tracking, structured LLM evals',days:[
{d:'Mon',t:'se',a:'Event-driven architecture - Kafka patterns depth',pl:'free',th:'Outbox pattern, saga choreography vs orchestration, idempotent consumers, dead letter queues',h:'2h'},
{d:'Tue',t:'ml',a:'MLflow - experiment tracking and model registry',pl:'free',th:'Run tracking, artifact storage, model lifecycle stages, A/B model deployment, custom metrics',h:'2h'},
{d:'Wed',t:'fs',a:'Enterprise UI Development - FM',pl:'fm',th:'Testing pyramid: unit, integration, E2E; component architecture; Playwright and Vitest setup',h:'2h'},
{d:'Thu',t:'ai',a:'Prompt engineering - structured outputs and eval harnesses',pl:'free',th:'JSON mode, tool schemas, few-shot templates, evaluation framework, LLM-as-judge pattern',h:'2h'},
{d:'Fri',t:'dsa',a:'Graph algorithms - Dijkstra, MST, topological sort',pl:'ed',th:'Dijkstra with heap optimization, Kruskal and Prim, Kahn algorithm, cycle detection',h:'1.5h'},
{d:'Sat',t:'prj',a:'Odysseus - MLflow tracking for AI feature experiments',pl:'prj',th:'Track prompt versions, response quality scores, token costs, latency distributions per run',h:'2h'},
{d:'Sun',t:'read',a:'Production LLM patterns blog + Simon Willison',pl:'free',th:'Semantic caching, fallback strategies, cost optimization, observability and tracing in prod',h:'1h'},
]},
{w:12,p:2,dates:'Jul 6-11',title:'Phase 2 Integration Capstone',focus:'Full architecture doc. ML system design timed mock. Ship AI feature.',days:[
{d:'Mon',t:'se',a:'Architecture review - design Odysseus v2 from scratch',pl:'prj',th:'Full system design doc: services, data flow, API contracts, scaling plan, tradeoff table',h:'2h'},
{d:'Tue',t:'ml',a:'ML system design mock - recommendation engine',pl:'free',th:'Feature engineering, model choice, serving architecture, monitoring plan (45-min timed)',h:'2h'},
{d:'Wed',t:'fs',a:'WTF Do I Eat - mood AI feature + UI polish',pl:'prj',th:'OpenAI integration, mood to restaurant category mapping, filter logic, animation polish',h:'2h'},
{d:'Thu',t:'ai',a:'LangGraph intro - stateful agent workflows',pl:'free',th:'Graph-based agent loops, state machine for LLM workflows, conditional routing, persistence',h:'2h'},
{d:'Fri',t:'dsa',a:'Timed DSA mock session - 2 hours',pl:'free',th:'Mixed: trees, DP, graphs. Practice explaining thought process aloud at each step.',h:'2h'},
{d:'Sat',t:'prj',a:'Ship AI feature to production - Odysseus',pl:'prj',th:'Full deploy: CI/CD, smoke tests, monitoring, rollback plan. Done over perfect.',h:'2h'},
{d:'Sun',t:'read',a:'The Staff Engineers Path intro + Phase 2 retro',pl:'free',th:'Staff+ scope and influence without authority. Write your Phase 2 retrospective doc.',h:'1h'},
]},
{w:13,p:3,dates:'Jul 12-18',title:'Cloud Certification + AI Product Design',focus:'Google Cloud track, AWS frontend, AI product UX thinking',days:[
{d:'Mon',t:'se',a:'Google Associate Cloud Engineer - DC track',pl:'dc',th:'GCP compute, networking, IAM, Cloud Run vs GKE, load balancing, Cloud SQL setup',h:'2h'},
{d:'Tue',t:'ml',a:'Time series forecasting + NLP fundamentals',pl:'dc',th:'ARIMA, Prophet, LSTM for sequences; tokenization, word embeddings, BERT intuition',h:'2h'},
{d:'Wed',t:'fs',a:'AWS for Frontend Engineers - FM',pl:'fm',th:'S3 plus CloudFront CDN, Lambda@Edge, IAM policies, presigned URLs, WAF basics',h:'2h'},
{d:'Thu',t:'ai',a:'AI product design - UX and evaluation frameworks',pl:'free',th:'Human-in-the-loop design, latency expectations, graceful degradation, AI error UX patterns',h:'2h'},
{d:'Fri',t:'dsa',a:'String algorithms - sliding window and two pointers',pl:'free',th:'Longest substring patterns, palindrome detection, anagram problems, window shrink logic',h:'1.5h'},
{d:'Sat',t:'prj',a:'KombiTracker - real-time features with WebSockets',pl:'prj',th:'WebSocket server with Fastify, live route status updates, Africa\'s Talking OTP wiring',h:'2h'},
{d:'Sun',t:'read',a:'Designing ML Systems Ch 1-3 (Chip Huyen)',pl:'free',th:'ML systems overview, project scoping framework, data engineering for ML pipelines',h:'1h'},
]},
{w:14,p:3,dates:'Jul 19-25',title:'Infrastructure as Code + Advanced Prompting',focus:'Terraform fundamentals, CV transfer learning, serverless edge functions',days:[
{d:'Mon',t:'se',a:'Infrastructure as Code - Terraform fundamentals',pl:'free',th:'HCL syntax, providers, modules, remote state, drift detection, plan and apply workflow',h:'2h'},
{d:'Tue',t:'ml',a:'Computer vision - transfer learning and ResNet fine-tuning',pl:'free',th:'CNN architecture intuition, ImageNet pretraining strategy, fine-tuning, data augmentation',h:'2h'},
{d:'Wed',t:'fs',a:'Serverless Functions - FM',pl:'fm',th:'Edge functions, cold start mitigation, Vercel and Netlify patterns, global latency routing',h:'2h'},
{d:'Thu',t:'ai',a:'Advanced prompting - function schemas and eval harnesses',pl:'free',th:'Structured tool schemas, multi-turn reasoning, eval harnesses, prompt regression testing',h:'2h'},
{d:'Fri',t:'dsa',a:'Bit manipulation and mathematical algorithms',pl:'free',th:'XOR tricks, power-of-two checks, sieve methods, modular arithmetic, combinatorics basics',h:'1.5h'},
{d:'Sat',t:'prj',a:'WTF Do I Eat - infra and deployment hardening',pl:'prj',th:'Terraform for hosting stack, environment config, secrets, monitoring, rollback-ready deploys',h:'2h'},
{d:'Sun',t:'read',a:'Terraform docs + Designing Data-Intensive Applications notes',pl:'free',th:'Infra-as-code mental models plus notes consolidation from DDIA so far',h:'1h'},
]},
{w:15,p:3,dates:'Jul 26-Aug 1',title:'Security + Recommenders + Advanced React',focus:'Zero-trust, recommender systems, security architecture, advanced React patterns',days:[
{d:'Mon',t:'se',a:'Security Architecture - OWASP and zero-trust',pl:'ed',th:'STRIDE threat model, injection prevention, mTLS, secrets management, zero-trust principles',h:'2h'},
{d:'Tue',t:'ml',a:'Recommendation systems - collaborative filtering depth',pl:'dc',th:'Matrix factorization, ALS algorithm, cold start problem, hybrid CF plus content approaches',h:'2h'},
{d:'Wed',t:'fs',a:'React + TypeScript advanced patterns - FM',pl:'fm',th:'Compound components, render props, HOCs, context optimization, Suspense boundary design',h:'2h'},
{d:'Thu',t:'ai',a:'Semantic search - hybrid retrieval and RAG evaluation',pl:'free',th:'BM25 plus dense hybrid search, cross-encoder reranking, RAGAS faithfulness and relevance',h:'2h'},
{d:'Fri',t:'dsa',a:'Backtracking - N-Queens, sudoku, constraint satisfaction',pl:'free',th:'State space tree, pruning strategies, constraint propagation, backtracking template patterns',h:'1.5h'},
{d:'Sat',t:'prj',a:'Odysseus - full security audit fixes',pl:'prj',th:'Production startup assertions, refresh token rotation docs, CORS config, browser key fix',h:'2h'},
{d:'Sun',t:'read',a:'Securing REST APIs (Educative) + Password Security (Educative)',pl:'ed',th:'API security patterns, bcrypt vs argon2, secure token storage, rate limiting strategies',h:'1h'},
]},
{w:16,p:3,dates:'Aug 2-8',title:'System Design Mastery + ML Monitoring',focus:'Netflix, Uber, WhatsApp case studies. Drift detection. D3.js.',days:[
{d:'Mon',t:'se',a:'System Design cases - Netflix, Uber, WhatsApp',pl:'ed',th:'Netflix: CDN plus adaptive bitrate. Uber: geospatial indexing. WhatsApp: message ordering.',h:'2h'},
{d:'Tue',t:'ml',a:'ML monitoring - drift detection and alerting',pl:'free',th:'Concept drift vs data drift, Evidently library, Great Expectations, alerting threshold setup',h:'2h'},
{d:'Wed',t:'fs',a:'D3.js and Data Visualization - FM',pl:'fm',th:'SVG, scales, axes, data joins, transitions, force-directed layouts, geographic projections',h:'2h'},
{d:'Thu',t:'ai',a:'Multi-agent systems - CrewAI and orchestration',pl:'free',th:'Role-based agents, inter-agent communication, shared memory, reliability and fallback patterns',h:'2h'},
{d:'Fri',t:'dsa',a:'LeetCode medium/hard - timed 2-hour session',pl:'free',th:'Pattern recognition speed. Explain thought process aloud. Time each problem individually.',h:'2h'},
{d:'Sat',t:'prj',a:'KombiTracker - route visualization with D3.js',pl:'prj',th:'Cape Town minibus route heatmap, live crowdsource overlay, SVG transition animations',h:'2h'},
{d:'Sun',t:'read',a:'Clean Architecture Ch 1-5 (Uncle Bob)',pl:'free',th:'SOLID principles, clean architecture dependency rule, plugin architecture, component coupling',h:'1h'},
]},
{w:17,p:3,dates:'Aug 9-15',title:'Open Source First PR + Ship WTF Do I Eat',focus:'First open source contribution. AutoML. Ship the app on iOS and Android.',days:[
{d:'Mon',t:'se',a:'Open source - navigate codebase and find first issue',pl:'free',th:'Fastify or Drizzle ORM: understand project structure, conventions, contribution workflow',h:'2h'},
{d:'Tue',t:'ml',a:'AutoML - Optuna and hyperparameter optimization',pl:'free',th:'Bayesian optimization, Tree-structured Parzen Estimator, search space design, early stopping',h:'2h'},
{d:'Wed',t:'fs',a:'WebGL and shaders intro - FM',pl:'fm',th:'GLSL basics, vertex and fragment shaders, uniforms, creative visual coding techniques',h:'1.5h'},
{d:'Thu',t:'ai',a:'Evaluation-driven development - LLM benchmarking',pl:'free',th:'RAGAS framework, BLEU/ROUGE limitations, human eval setup, prompt regression test suite',h:'2h'},
{d:'Fri',t:'dsa',a:'Segment trees, Fenwick trees, range queries',pl:'free',th:'Range sum queries, point updates, BIT construction O(n), range minimum query patterns',h:'1.5h'},
{d:'Sat',t:'prj',a:'WTF Do I Eat - ship MVP with Capacitor',pl:'prj',th:'Capacitor build for iOS and Android, native plugins, App Store submission checklist',h:'3h'},
{d:'Sun',t:'read',a:'The Pragmatic Programmer Ch 5-8',pl:'free',th:'Bend or break, while you are coding, before the project, pragmatic projects mindset',h:'1h'},
]},
{w:18,p:3,dates:'Aug 16-22',title:'Performance Optimization + Phase 3 Capstone',focus:'DB profiling, QLoRA fine-tuning, bundle optimization, phase review',days:[
{d:'Mon',t:'se',a:'Performance engineering - profiling and DB optimization',pl:'free',th:'Flamegraphs, N+1 query detection, EXPLAIN ANALYZE depth, connection pooling, pg_stat_statements',h:'2h'},
{d:'Tue',t:'ml',a:'Fine-tuning in practice - QLoRA with Unsloth',pl:'free',th:'ShareGPT dataset format, training args, gradient checkpointing, checkpoint saving and eval',h:'2h'},
{d:'Wed',t:'fs',a:'Bundle optimization - lazy loading and Core Web Vitals',pl:'fm',th:'LCP, CLS, INP targets, route-based splitting, prefetching strategies, image optimization',h:'2h'},
{d:'Thu',t:'ai',a:'Designing ML Systems Ch 7-8 - Feature Engineering',pl:'free',th:'Feature crosses, temporal train-test splits, label leakage detection, training data quality',h:'2h'},
{d:'Fri',t:'dsa',a:'Design patterns in TypeScript - GoF applied',pl:'free',th:'Factory, Observer, Strategy, Decorator patterns in TypeScript: when to use and tradeoffs',h:'1.5h'},
{d:'Sat',t:'prj',a:'Odysseus - performance profile and fix top 3 bottlenecks',pl:'prj',th:'Profile queries, reduce JS bundle, PgBouncer connection pool, measure before and after',h:'2h'},
{d:'Sun',t:'read',a:'Designing ML Systems Ch 9 + Phase 3 retro',pl:'free',th:'Continual learning, data flywheels, online learning concepts. Write Phase 3 retrospective.',h:'1h'},
]},
{w:19,p:4,dates:'Aug 23-29',title:'Staff+ Thinking Begins',focus:'Become Highest Paid Engineer course. ADRs. AI governance. Design systems.',days:[
{d:'Mon',t:'se',a:'Become the Highest Paid Engineer - Educative',pl:'ed',th:'Staff+ operating model, safe AI integration, crisis leadership, scope expansion strategies',h:'2h'},
{d:'Tue',t:'ml',a:'ML strategy - build vs buy, model selection frameworks',pl:'free',th:'When to fine-tune vs prompt, OSS vs API tradeoffs, cost-quality curves, team capability fit',h:'2h'},
{d:'Wed',t:'fs',a:'Design Systems with Storybook - FM',pl:'fm',th:'Component libraries, accessibility standards, visual regression testing, documentation-as-code',h:'2h'},
{d:'Thu',t:'ai',a:'AI governance - bias, fairness, explainability, EU AI Act',pl:'free',th:'SHAP values, fairness metrics: demographic parity and equalized odds, model cards, audit trails',h:'2h'},
{d:'Fri',t:'dsa',a:'Amortized analysis and complexity theory depth',pl:'free',th:'Amortized O via potential method, P vs NP intuition, NP-hard problem recognition patterns',h:'1.5h'},
{d:'Sat',t:'prj',a:'Odysseus - write Architecture Decision Records',pl:'prj',th:'Document: DB choice, API design, auth strategy, AI integration. Public portfolio-ready format.',h:'2h'},
{d:'Sun',t:'read',a:'The Staff Engineers Path Ch 2-3',pl:'free',th:'Technical execution at staff level, vision setting, mentorship, upward communication strategies',h:'1h'},
]},
{w:20,p:4,dates:'Aug 30-Sep 5',title:'C4 Architecture + ML System Design Mock',focus:'Public architecture docs, compiler internals, YouTube recommendations design',days:[
{d:'Mon',t:'se',a:'Architecture documentation - C4 model for Odysseus',pl:'free',th:'Context to Container to Component to Code diagrams. Structurizr DSL. Make it shareable.',h:'2h'},
{d:'Tue',t:'ml',a:'ML system design mock - YouTube Recommendations',pl:'free',th:'Two-tower model, candidate generation, ranking stage, serving infrastructure, eval metrics',h:'2h'},
{d:'Wed',t:'fs',a:'Compiler building intro - FM advanced track',pl:'fm',th:'Tokenization, recursive descent parsing, ASTs, tree-walking interpreter fundamentals',h:'2h'},
{d:'Thu',t:'ai',a:'Agents in production - reliability and cost management',pl:'free',th:'Retry with backoff, streaming fallbacks, cost-per-request budgets, token optimization',h:'2h'},
{d:'Fri',t:'dsa',a:'Mock technical interview - DSA plus system design combo',pl:'free',th:'90-min simulation: 45 coding plus 45 system design. Record yourself and review the gaps.',h:'2h'},
{d:'Sat',t:'prj',a:'Publish Odysseus C4 architecture diagrams publicly',pl:'prj',th:'Add to portfolio site. Shows architectural thinking to any hiring manager who visits.',h:'2h'},
{d:'Sun',t:'read',a:'Clean Architecture Ch 6-10 + DDIA final chapters',pl:'free',th:'Screaming architecture, boundaries, future of data systems. Tie the whole roadmap together.',h:'1h'},
]},
{w:21,p:4,dates:'Sep 6-12',title:'Leadership + Technical Blog Post One',focus:'OKRs and roadmaps. ML paper reading habit. First published post.',days:[
{d:'Mon',t:'se',a:'Engineering leadership - OKRs, roadmaps, stakeholder comms',pl:'free',th:'An Elegant Puzzle frameworks, tech debt negotiation, prioritization under uncertainty',h:'2h'},
{d:'Tue',t:'ml',a:'Read 3 recent ML papers from Papers With Code',pl:'free',th:'Pick: multimodal, diffusion, or agent reasoning. Write a 3-sentence summary of each.',h:'2h'},
{d:'Wed',t:'fs',a:'WTF Do I Eat - monetization implementation',pl:'prj',th:'Stripe subscription flow, feature gating, premium restaurant tier, revenue analytics dashboard',h:'2h'},
{d:'Thu',t:'ai',a:'Building AI products - prototype to production checklist',pl:'free',th:'Eval setup, observability and tracing, safety checks, staged rollout, user feedback loop',h:'2h'},
{d:'Fri',t:'dsa',a:'System design plus DSA hybrid problems',pl:'free',th:'Design and implement: LRU cache, distributed rate limiter, consistent hash ring from scratch',h:'2h'},
{d:'Sat',t:'prj',a:'Write and publish technical blog post one',pl:'prj',th:'Topic: How I built a multi-tenant tutoring LMS with Fastify and PostgreSQL in production',h:'3h'},
{d:'Sun',t:'read',a:'An Elegant Puzzle - Will Larson selected chapters',pl:'free',th:'Sizing engineering teams, managing technical debt, systems thinking for engineering managers',h:'1h'},
]},
{w:22,p:4,dates:'Sep 13-19',title:'SRE Concepts + Open Source PR',focus:'Error budgets, SLOs, ML open source contribution, LLM cost optimization',days:[
{d:'Mon',t:'se',a:'SRE concepts - SLOs, SLIs, error budgets, postmortems',pl:'free',th:'Defining SLOs from user journeys, error budget policies, blameless postmortem structure',h:'2h'},
{d:'Tue',t:'ml',a:'Contribute to ML open source - scikit-learn issue',pl:'free',th:'Find docs issue or small bug fix. Understand the codebase. Submit with tests.',h:'2h'},
{d:'Wed',t:'fs',a:'UX Research for Engineers - FM',pl:'fm',th:'User testing methods, usability heuristics, turning feedback into feature requirements',h:'2h'},
{d:'Thu',t:'ai',a:'LLM cost optimization - caching, batching, model routing',pl:'free',th:'Semantic caching with Redis, request batching, cheap vs expensive model routing logic',h:'2h'},
{d:'Fri',t:'dsa',a:'Fastify or Drizzle ORM open source contribution prep',pl:'free',th:'Navigate the codebase. Find a real issue. Write the fix with tests and a clear description.',h:'2h'},
{d:'Sat',t:'prj',a:'Submit open source PR - Fastify or Drizzle ORM',pl:'prj',th:'Polish it, write a clear PR description, respond to reviewer feedback professionally',h:'2h'},
{d:'Sun',t:'read',a:'The Phoenix Project - finish it',pl:'free',th:'DevOps culture, Theory of Constraints, IT as business enabler. Read it like a manager.',h:'1h'},
]},
{w:23,p:4,dates:'Sep 20-26',title:'Portfolio Polish',focus:'Every project gets a case study. LinkedIn updated. Blog post two drafted.',days:[
{d:'Mon',t:'se',a:'Portfolio - Odysseus architecture writeup and case study',pl:'prj',th:'Structure: problem, solution, technical decisions, tradeoffs, metrics, what you would change',h:'2h'},
{d:'Tue',t:'ml',a:'Portfolio - Monte Carlo toolkit plus honours research writeup',pl:'prj',th:'Explain DeepSORT vs ByteTrack with YOLOv8 for a technical non-ML audience clearly',h:'2h'},
{d:'Wed',t:'fs',a:'Portfolio site - all project case studies live',pl:'prj',th:'Each project: challenge, approach, tech stack, live demo, GitHub link, lessons learned',h:'2h'},
{d:'Thu',t:'ai',a:'Portfolio - RAG system and AI features documented',pl:'prj',th:'Architecture diagram, design decisions, evaluation methodology, before and after metrics',h:'2h'},
{d:'Fri',t:'dsa',a:'Final DSA pattern review - every major category',pl:'free',th:'Flash review: trees, graphs, DP, strings, sorting, complexity. Know them cold and fast.',h:'1.5h'},
{d:'Sat',t:'prj',a:'Write and publish technical blog post two',pl:'prj',th:'Topic: Building a RAG tutoring system with pgvector, LangChain, and Fastify in production',h:'3h'},
{d:'Sun',t:'read',a:'LinkedIn and GitHub full audit - update everything',pl:'prj',th:'New certs, blog posts, ADRs, open source PRs, architecture diagrams, updated project links',h:'1h'},
]},
{w:24,p:4,dates:'Sep 27-Oct 3',title:'Capstone and Launch Week',focus:'Everything deployed. Full system design doc. Plan the next 6 months.',days:[
{d:'Mon',t:'se',a:'Full system design doc for Odysseus v2',pl:'prj',th:'Complete: requirements, capacity plan, architecture, data model, API specs, full tradeoffs doc',h:'2h'},
{d:'Tue',t:'ml',a:'Final ML project - train and deploy end to end',pl:'prj',th:'Raw data to feature engineering to training to evaluation to FastAPI to Docker to DO deploy',h:'2h'},
{d:'Wed',t:'fs',a:'KombiTracker public launch preparation',pl:'prj',th:'Landing page, ProductHunt draft, social announcement, demo video, press kit for launch',h:'2h'},
{d:'Thu',t:'ai',a:'AI agent demo - shareable portfolio piece',pl:'prj',th:'Build: tutoring bot or research agent. Clean hosted UI, shareable link, clear README',h:'2h'},
{d:'Fri',t:'dsa',a:'Senior engineer mock interview - full 2-hour simulation',pl:'free',th:'60 min coding plus 45 min system design plus 15 min leadership and behavioural questions',h:'2h'},
{d:'Sat',t:'prj',a:'All projects deployed, documented, portfolio ready',pl:'prj',th:'Final quality pass. Live links. Clean READMEs. This is your proof of work for 6 months.',h:'3h'},
{d:'Sun',t:'read',a:'Write 6-month retro + plan the next 6 months',pl:'prj',th:'What worked, what did not, what is next. Make it public if you are brave enough.',h:'1h'},
]},
];
const SUPP=[
{title:'System Design and Software Engineering',c:'#22B07D',items:[
{n:'Designing Data-Intensive Applications',a:'Martin Kleppmann',d:'THE system design book. Read it cover to cover alongside this roadmap.',f:false},
{n:'System Design Interview Vol 1 and 2',a:'Alex Xu',d:'Case-study format. Builds architectural intuition fast. Very practical.',f:false},
{n:'Clean Architecture',a:'Robert C. Martin',d:'SOLID principles and architectural patterns applied to real systems.',f:false},
{n:'ByteByteGo Newsletter',a:'Alex Xu (bytebytego.com)',d:'Weekly system design breakdowns with excellent diagrams. Subscribe now.',f:true},
{n:'Hussein Nasser on YouTube',a:'Hussein Nasser',d:'DB internals, Postgres deep dives, networking, protocol analysis. Great.',f:true},
{n:'The Phoenix Project',a:'Gene Kim, Kevin Behr, Spafford',d:'DevOps culture as a novel. Read it once a year starting now.',f:false},
{n:'An Elegant Puzzle',a:'Will Larson',d:'Engineering management systems thinking. Read it in Phase 4.',f:false},
]},
{title:'Machine Learning Engineering',c:'#4AADEA',items:[
{n:'Hands-On ML with Scikit-Learn, Keras and TF',a:'Aurelien Geron',d:'Most practical ML book available. Use it alongside DataCamp courses.',f:false},
{n:'Practical Deep Learning for Coders',a:'fast.ai / Jeremy Howard',d:'Top-down approach to deep learning. Free course. One of the best.',f:true},
{n:'Neural Networks: Zero to Hero',a:'Andrej Karpathy (YouTube)',d:'Best backpropagation intuition on the internet. Watch all of it.',f:true},
{n:'Made with ML',a:'Goku Mohandas (madewithml.com)',d:'ML engineering from training to production. Free and genuinely excellent.',f:true},
{n:'Papers With Code',a:'Meta AI (paperswithcode.com)',d:'Browse SOTA papers with implementations. Read 1 paper per week from Wk 21.',f:true},
{n:'The Hundred-Page ML Book',a:'Andriy Burkov',d:'Concise theory reference. Read it in a weekend for the full picture.',f:false},
{n:'Designing ML Systems',a:'Chip Huyen',d:'Production ML: data, training, serving, monitoring, evaluation. Priority read.',f:false},
]},
{title:'AI Engineering',c:'#A08FEE',items:[
{n:'AI Engineering',a:'Chip Huyen (2024)',d:'The definitive book on building production AI systems and products.',f:false},
{n:'Anthropic Prompt Engineering Guide',a:'Anthropic (docs.anthropic.com)',d:'Official guide. Read and re-read it. Very practical and up to date.',f:true},
{n:'Simon Willison Blog',a:'simonwillison.net',d:'Best independent LLM commentary and practical patterns. Subscribe.',f:true},
{n:'OpenAI Cookbook',a:'OpenAI (github.com/openai/openai-cookbook)',d:'Production AI integration patterns. Free. Use it as a practical reference.',f:true},
{n:'LangChain and LangGraph Docs',a:'LangChain',d:'Work through them hands-on. The docs are well-written with code examples.',f:true},
{n:'Latent Space Podcast',a:'swyx and Alessio',d:'Best AI engineering podcast for staying current. Listen on commutes.',f:true},
]},
{title:'Full Stack Development',c:'#F5A623',items:[
{n:'The Pragmatic Programmer',a:'Hunt and Thomas',d:'Career and craft fundamentals. Read once a year, every year.',f:false},
{n:'You Do Not Know JS (series)',a:'Kyle Simpson (GitHub)',d:'Deep JavaScript internals. Free on GitHub. Essential for senior FS.',f:true},
{n:'Josh Comeau Blog',a:'joshwcomeau.com',d:'CSS and React patterns explained with excellent visual examples.',f:true},
{n:'Kent C. Dodds Blog',a:'kentcdodds.com',d:'React testing, architecture, and patterns. Start with the testing articles.',f:true},
{n:'Web Scalability for Startup Engineers',a:'Artur Ejsmont',d:'Backend architecture for scale from zero. Practical and well-structured.',f:false},
{n:'Fireship on YouTube',a:'Jeff Delaney',d:'100-second concept videos and in-depth tutorials. Great for breadth.',f:true},
]},
];
const STATUS_META={
  not_started:{label:'Not started',weight:0},
  in_progress:{label:'In progress',weight:0.4},
  blocked:{label:'Blocked',weight:0.2},
  done:{label:'Done',weight:1},
  shipped:{label:'Shipped',weight:1},
  reviewed:{label:'Reviewed',weight:1}
};
const DEFAULT_EVIDENCE={githubUrl:'',liveUrl:'',notes:'',certificate:false,certificateUrl:'',screenshotUrl:'',reflection:''};
const DEFAULT_REVIEW={wins:'',blockers:'',learned:'',improve:'',confidence:3};
const DEFAULT_FILTERS={track:'all',platform:'all',search:'',showIncomplete:false,showEvidenceOnly:false,showShippedOnly:false,focusMode:false};
const STORAGE={key:'roadmapExecutionStore',version:3};
const DAY_MS=24*60*60*1000;
const TODAY=new Date();

function conceptTokens(text){
  return String(text||'').split(/[;,]+/).map(function(chunk){return chunk.trim();}).filter(Boolean);
}
function toRGBA(hex,alpha){
  var raw=(hex||'#5670D8').replace('#','');
  var h=raw.length===3?raw.split('').map(function(ch){return ch+ch;}).join(''):raw;
  var r=parseInt(h.slice(0,2),16);
  var g=parseInt(h.slice(2,4),16);
  var b=parseInt(h.slice(4,6),16);
  return 'rgba('+r+','+g+','+b+','+alpha+')';
}
function escapeHTML(value){
  return String(value==null?'':value).replace(/[&<>"']/g,function(ch){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
  });
}
function escapeAttr(value){
  return escapeHTML(value).replace(/"/g,'&quot;');
}
function badge(pl){
  return '<span class="pbadge '+(BC[pl]||'bfree')+'">'+escapeHTML(PL[pl]||pl)+'</span>';
}
function trackPill(trackId){
  var track=TRACKS[trackId]||{name:'General'};
  var key=trackId||'read';
  return '<span class="trackpill badge" data-track="'+escapeAttr(key)+'">'+escapeHTML(track.name)+'</span>';
}
function formatPct(value){
  return Math.round(value)+'%';
}
function statusWeight(status){
  return (STATUS_META[status]||STATUS_META.not_started).weight;
}
function isCompleteStatus(status){
  return statusWeight(status)>=1;
}
function hasText(value){
  return Boolean(String(value||'').trim());
}
function countEvidence(evidence){
  return ['githubUrl','liveUrl','notes','certificateUrl','screenshotUrl','reflection'].reduce(function(total,key){
    return total+(hasText(evidence[key])?1:0);
  },evidence.certificate?1:0);
}
function hasEvidence(evidence){
  return countEvidence(evidence)>0;
}
function deriveKind(day){
  var text=(day.a+' '+day.th).toLowerCase();
  if(day.t==='prj'||/(build|ship|deploy|launch|publish|feature|portfolio|case study|production|project)/.test(text))return 'project';
  if(day.t==='read'||/(chapter|read|book|docs|paper|theory)/.test(text))return 'theory';
  return 'practice';
}
function deriveMilestone(day){
  var text=(day.a+' '+day.th).toLowerCase();
  if(day.exam)return {label:'Exam milestone',type:'exam'};
  if(/(ship|deploy|launch|publish|submit|cert|capstone|retro|portfolio)/.test(text))return {label:'Milestone',type:'ship'};
  return null;
}
function derivePhaseNumber(weekNumber){
  return Math.min(6,Math.floor((weekNumber-1)/4)+1);
}
function parseHourLabel(label){
  var value=parseFloat(label);
  return Number.isFinite(value)?value:0;
}
function toIsoDate(baseDate,offsetDays){
  var date=new Date(baseDate.getTime()+offsetDays*DAY_MS);
  return date.toISOString().slice(0,10);
}
function derivePriority(day){
  if(day.exam)return 'urgent';
  if(day.t==='prj')return 'high';
  if(day.t==='read')return 'low';
  return 'medium';
}
function buildRoadmapData(){
  var roadmapStartDate='2026-04-19';
  var startDateObj=new Date(roadmapStartDate+'T00:00:00Z');
  var currentWeek=Math.min(24,Math.max(1,Math.floor((TODAY.getTime()-startDateObj.getTime())/(7*DAY_MS))+1));
  var phases=Object.keys(PHASES).map(function(key){
    return {
      id:'phase-'+key,
      number:Number(key),
      name:PHASES[key].name,
      dates:PHASES[key].dates,
      goal:PHASES[key].goal
    };
  });
  var weeks=W.map(function(week){
    var weekId='week-'+week.w;
    var tasks=week.days.map(function(day,index){
      var plannedOffset=((week.w-1)*7)+index;
      var plannedDate=toIsoDate(startDateObj,plannedOffset);
      var durationHours=parseHourLabel(day.h);
      return {
        id:'w'+week.w+'-d'+index,
        weekId:weekId,
        weekNumber:week.w,
        phaseNumber:derivePhaseNumber(week.w),
        dayLabel:day.d,
        trackId:day.t,
        platformId:day.pl,
        source:PL[day.pl]||day.pl,
        title:day.a,
        conceptText:day.th,
        concepts:conceptTokens(day.th).slice(0,7),
        durationHours:durationHours,
        durationLabel:day.h,
        estimatedTime:day.h,
        plannedDate:plannedDate,
        dueDate:plannedDate,
        isActiveThisWeek:week.w===currentWeek,
        exam:Boolean(day.exam),
        kind:deriveKind(day),
        milestone:deriveMilestone(day),
        linkedMilestone:'milestone-'+weekId,
        linkedMilestoneTitle:week.title,
        priority:derivePriority(day),
        nextAction:'Start first 25 minutes and capture one concrete output.',
        outputRequired:day.t==='prj'?'Ship a working artifact with proof link.':'Publish concise study notes with key takeaways.'
      };
    });
    return {
      id:weekId,
      number:week.w,
      phaseNumber:derivePhaseNumber(week.w),
      dates:week.dates,
      title:week.title,
      focus:week.focus,
      tasks:tasks
    };
  });
  var tasks=weeks.flatMap(function(week){return week.tasks;});
  var milestones=weeks.map(function(week){
    var skillsTrained=Array.from(new Set(week.tasks.map(function(task){return task.trackId;})));
    var expectedTask=week.tasks.find(function(task){return task.kind==='project'||task.exam;})||week.tasks[week.tasks.length-1];
    var hasHardSignal=week.tasks.some(function(task){return task.durationHours>=2||task.exam||task.kind==='project';});
    return {
      id:'milestone-'+week.id,
      weekId:week.id,
      phaseNumber:week.phaseNumber,
      priority:week.number,
      title:week.title,
      description:week.focus,
      skillsTrained:skillsTrained,
      evidenceRequirements:['Notes summary','Artifact link','Reflection'],
      expectedOutput:expectedTask?expectedTask.title:'Complete weekly outcomes',
      difficulty:hasHardSignal?'hard':'medium',
      status:'not_started',
      evidencePlaceholder:'Attach PR, notes, screenshots, or certificate evidence for this milestone.',
      weeklyTaskIds:week.tasks.map(function(task){return task.id;})
    };
  });
  return {
    roadmap:{
      id:'six-month-tech-roadmap',
      title:'6-Month Tech Roadmap',
      startDate:roadmapStartDate,
      endDate:'2026-10-03',
      totalWeeks:24,
      currentWeek:currentWeek,
      settings:{statusWeights:Object.fromEntries(Object.keys(STATUS_META).map(function(key){return [key,STATUS_META[key].weight];}))}
    },
    phases:phases,
    weeks:weeks,
    tasks:tasks,
    milestones:milestones,
    resources:SUPP
  };
}
const ROADMAP_DATA=buildRoadmapData();

window.RoadmapData={
  C:C,
  PL:PL,
  BC:BC,
  TRACKS:TRACKS,
  PHASES:PHASES,
  SUPP:SUPP,
  STATUS_META:STATUS_META,
  DEFAULT_EVIDENCE:DEFAULT_EVIDENCE,
  DEFAULT_REVIEW:DEFAULT_REVIEW,
  DEFAULT_FILTERS:DEFAULT_FILTERS,
  STORAGE:STORAGE,
  DAY_MS:DAY_MS,
  TODAY:TODAY,
  ROADMAP_DATA:ROADMAP_DATA,
  conceptTokens:conceptTokens,
  toRGBA:toRGBA,
  escapeHTML:escapeHTML,
  escapeAttr:escapeAttr,
  badge:badge,
  trackPill:trackPill,
  formatPct:formatPct,
  statusWeight:statusWeight,
  isCompleteStatus:isCompleteStatus,
  hasText:hasText,
  countEvidence:countEvidence,
  hasEvidence:hasEvidence
};
})();
