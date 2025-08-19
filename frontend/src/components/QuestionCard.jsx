import React from 'react';
export default function QuestionCard({ q, response, onAnswer }){
  return (<div className='border rounded p-3 mb-3'><h3>{q.stem}</h3>{q.type==='mcq'&&q.options?.map((o,i)=>(<label key={i}><input type='radio' checked={response?.answer===i} onChange={()=>onAnswer(q._id, i)} /> {o}</label>))}{q.type==='short'&&(<input type='text' value={response?.answer||''} onChange={e=>onAnswer(q._id, e.target.value)} />)}</div>);
}
