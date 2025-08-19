import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QuestionCard from './QuestionCard';

export default function TestRunner(){
  const { id } = useParams();
  const [mock, setMock] = useState(null);
  const [attemptId, setAttemptId] = useState(null);
  const [responses, setResponses] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(()=>{
    const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' });
    API.get(`/mocks/${id}`).then(r=>{ setMock(r.data); setTimeLeft((r.data.config?.time||10)*60); });
  },[id]);

  useEffect(()=>{ if(!attemptId && mock){ const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' }); API.post('/attempts/start',{ mockId: mock._id }).then(r=> setAttemptId(r.data.attemptId)); } },[mock, attemptId]);

  useEffect(()=>{ if(submitted) return; if(timeLeft<=0){ handleSubmit(); return } const t=setInterval(()=>setTimeLeft(tl=>tl-1),1000); return ()=>clearInterval(t); },[timeLeft, submitted]);

  useEffect(()=>{ if(!attemptId || submitted) return; const interval=setInterval(()=>{ const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' }); API.post('/attempts/autosave',{ attemptId, responses: Object.entries(responses).map(([q,a])=>({ question:q, answer:a.answer })) }); },30000); return ()=>clearInterval(interval); },[attemptId, responses, submitted]);

  const handleAnswer=(qid, ans)=> setResponses(r=>({ ...r, [qid]: { answer: ans } }));
  const handleSubmit=()=>{ const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' }); API.post('/attempts/submit',{ attemptId }).then(r=>{ setSubmitted(true); setScore(r.data.score); }); };

  if(!mock) return <div>Loading...</div>;
  if(submitted) return <div className='p-4'>Test finished. Score: {score}</div>;

  return (<div className='p-4'><h2>{mock.title}</h2><p>Time left: {Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}</p>{mock.sections.map((s,si)=>(<div key={si}><h3>{s.name}</h3>{s.questionObjs.map(q=>(<QuestionCard key={q._id} q={q} response={responses[q._id]} onAnswer={handleAnswer} />))}</div>))}<button onClick={handleSubmit}>Submit</button></div>);
}
