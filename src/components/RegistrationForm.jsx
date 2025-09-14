// // import { useState } from 'react';
// // import '../App.css';
// // import logo from './logo.png';

// // const constituencyOptions = [
// //   { value: 'Vidhyadhar nagar', hi: 'विद्याधर नगर', en: 'Vidhyadhar nagar' },
// //   { value: 'Jhotwara', hi: 'झोटवाड़ा', en: 'Jhotwara' },
// //   { value: 'Kishanpole', hi: 'किशनपोल', en: 'Kishanpole' },
// //   { value: 'Aamer', hi: 'आमेर', en: 'Amer' },
// //   { value: 'Bagru', hi: 'बागरू', en: 'Bagru' },
// //   { value: 'Sanganer', hi: 'सांगानेर', en: 'Sanganer' },
// //   { value: 'Malviya Nagar', hi: 'मालवीय नगर', en: 'Malviya Nagar' },
// //   { value: 'Adarsh nagar', hi: 'आदर्श नगर', en: 'Adarsh nagar' },
// //   { value: 'Hawa Mahal', hi: 'हवा महल', en: 'Hawa Mahal' },
// //   { value: 'Civil lines', hi: 'सिविल लाइन्स', en: 'Civil lines' }
// // ];
// // const tshirtSizes = [
// //   { value: 'S', hi: 'छोटा (S)', en: 'Small (S)' },
// //   { value: 'M', hi: 'मध्यम (M)', en: 'Medium (M)' },
// //   { value: 'L', hi: 'बड़ा (L)', en: 'Large (L)' },
// //   { value: 'XL', hi: 'एक्स्ट्रा बड़ा (XL)', en: 'X-Large (XL)' },
// //   { value: 'XXL', hi: 'डबल एक्स्ट्रा बड़ा (XXL)', en: 'XX-Large (XXL)' },
// // ];

// // const i18n = {
// //   hi: {
// //     title: 'अग्रचेतना मैराथॉन 2025',
// //     subtitle: 'अग्रचेतना मैराथॉन 21 सितम्बर 2025 सुबह 6 :00  बजे जय क्लब से शुरू होकर अग्रवाल कॉलेज जाएगी ',
// //     fullName: 'पूरा नाम *',
// //     contact: 'संपर्क नंबर *',
// //     age : 'उम्र *',
// //     gender: 'लिंग *',
// //     male: 'पुरुष',
// //     female: 'महिला',
// //     other: 'अन्य',
// //     constituency: 'विधानसभा',
// //     gotra: 'गोत्र *',
// //     tshirt: 'टी-शर्ट साइज *',
// //     submit: 'रजिस्टर करें',
// //     thankYou: 'पंजीकरण करने के लिए धन्यवाद!',
// //     already: 'आप इस डिवाइस से पहले ही पंजीकरण कर चुके हैं।',
// //     select: 'चुनें'
// //   },
// //   en: {
// //     title: 'अग्रचेतना मैराथॉन 2025',
// //     subtitle: 'अग्रचेतना मैराथॉन 21 सितम्बर 2025 सुबह 6 :00  बजे जय क्लब से शुरू होकर अग्रवाल कॉलेज जाएगी ',
// //     fullName: 'Full Name *',
// //     age : 'Age *',
// //     contact: 'Contact Number *',
// //     gender: 'Gender *',
// //     male: 'Male',
// //     female: 'Female',
// //     other: 'Other',
// //     constituency: 'विधानसभा',
// //     gotra: 'Gotra *',
// //     tshirt: 'T-shirt size *',
// //     submit: 'Register',
// //     thankYou: 'Thank you for registering!',
// //     already: 'You have already registered from this device.',
// //     select: 'Select'
// //   }
// // };

// // export default function RegistrationForm() {
// //   const [lang, setLang] = useState('hi');
// //   const t = i18n[lang];

// //   const [form, setForm] = useState({
// //     firstName: '',
// //     lastName: '',
// //     contact: '',
// //     age : '',
// //     gender: '',
// //     constituency: '',
// //     gotra: '',
// //     tshirt: ''
// //   });
// //   const [submitted, setSubmitted] = useState(false);
// //   const [error, setError] = useState('');
// //   const [submitting, setSubmitting] = useState(false);
// //   const [tickets, setTickets] = useState(() => {
// //     try {
// //       // Migrate older single-ticket storage to an array
// //       const single = window.localStorage.getItem('marathon_ticket');
// //       const list = window.localStorage.getItem('marathon_tickets');
// //       let parsedList = list ? JSON.parse(list) : [];
// //       if ((!list || parsedList.length === 0) && single) {
// //         const t = JSON.parse(single);
// //         parsedList = Array.isArray(t) ? t : [t];
// //         window.localStorage.setItem('marathon_tickets', JSON.stringify(parsedList));
// //         window.localStorage.removeItem('marathon_ticket');
// //       }
// //       return Array.isArray(parsedList) ? parsedList : [];
// //     } catch {
// //       return [];
// //     }
// //   });
// //   const [latestTicket, setLatestTicket] = useState(null);
// //   const [showTicket, setShowTicket] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     if (submitting) return;
// //     setSubmitting(true);
// //     e.preventDefault();
// //     setError('');
// //     try {
// //       const payload = {
// //         ...form,
// //         fullName: `${form.firstName} ${form.lastName}`.trim(),
// //       };
// //       delete payload.firstName;
// //       delete payload.lastName;
// //       const res = await fetch('http://localhost:4000/dev/register-marathon', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(payload)
// //       });
// //       const data = await res.json();
// //       if (!res.ok) {
// //         if (data.error && data.error.includes('maximum')) {
// //           setError(lang === 'hi' ? 'एक संपर्क नंबर से अधिकतम 2 पंजीकरण हो सकते हैं।' : 'Maximum 2 registrations allowed per contact number.');
// //         } else {
// //           throw new Error(data.error || 'Submission failed');
// //         }
// //         return;
// //       }
// //       setSubmitted(true);
// //       if (data.ticket) {
// //         setLatestTicket(data.ticket);
// //         setTickets((prev) => {
// //           const exists = prev.some((t) => String(t.id) === String(data.ticket.id));
// //           const updated = exists ? prev : [...prev, data.ticket];
// //           window.localStorage.setItem('marathon_tickets', JSON.stringify(updated));
// //           return updated;
// //         });
// //       } else {
// //         setLatestTicket(null);
// //       }
// //     } catch (err) {
// //       setError(lang === 'hi' ? 'पंजीकरण विफल हुआ। कृपया पुनः प्रयास करें।' : 'Registration failed. Please try again.');
// //     }
// //     setSubmitting(false);
// //   };

// //   return (
// //     <div className="reg-form-container">
// //       <div className="reg-form-header">
// //         <img src={logo} alt="Logo" className="form-logo-img" />
// //         <h2>{t.title}</h2>
// //         <marquee>{t.subtitle}</marquee>
// //         <div className="lang-toggle">
// //           <button type="button" className={`lang-btn ${lang==='hi' ? 'selected' : ''}`} onClick={() => setLang('hi')}>
// //             हिन्दी
// //           </button>
// //           <button type="button" className={`lang-btn ${lang==='en' ? 'selected' : ''}`} onClick={() => setLang('en')}>
// //             English
// //           </button>
// //         </div>
// //         {tickets && tickets.length > 0 && (
// //           <button
// //             className="ticket-icon-btn"
// //             title="View Tickets"
// //             style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', cursor: 'pointer' }}
// //             onClick={() => setShowTicket(true)}
// //           >
// //             <svg width="32" height="20" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
// //               <rect x="2" y="8" width="60" height="24" rx="8" fill="#1976d2" stroke="#fff" strokeWidth="2"/>
// //               <circle cx="10" cy="20" r="3" fill="#fff"/>
// //               <circle cx="54" cy="20" r="3" fill="#fff"/>
// //               <rect x="18" y="14" width="28" height="12" rx="4" fill="#fff"/>
// //               <rect x="18" y="14" width="28" height="12" rx="4" fill="#1976d2" fillOpacity="0.15"/>
// //             </svg>
// //           </button>
// //         )}
// //       </div>
// //       {showTicket && (
// //         <div className="modal-overlay" onClick={() => setShowTicket(false)}>
// //           <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 460, padding: 16, overflow: 'visible' }}>
// //             {tickets && tickets.length > 0 ? (
// //               <div>
// //                 <h3 style={{ color: '#1976d2', margin: '4px 0 12px' }}>🎟️ Your Tickets</h3>
// //                 <div style={{ display: 'grid', gap: 12 }}>
// //                   {tickets.map((t) => (
// //                     <div key={t.id} style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e8f3ff 100%)', borderRadius: 14, boxShadow: '0 6px 20px rgba(25,118,210,0.12)', padding: 16, position: 'relative', overflow: 'hidden', border: '1px solid #d6e4ff' }}>
// //                       <div style={{ position: 'absolute', top: 0, bottom: 0, left: 120, width: 1, borderLeft: '2px dashed #bbd2ff' }} />
// //                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'center' }}>
// //                         <div style={{ textAlign: 'left' }}>
// //                           <div style={{ fontSize: 12, color: '#5a7bb8', fontWeight: 700, letterSpacing: 1 }}>TICKET ID</div>
// //                           <div style={{ fontWeight: 800, fontSize: 22, color: '#0d47a1' }}>{formatTicketId(t.id)}</div>
// //                           <div style={{ marginTop: 6, fontWeight: 700, color: '#0d47a1' }}>{t.name}</div>
// //                           <div style={{ color: '#1e88e5', fontWeight: 600, marginTop: 4 }}>Contact: <span style={{ color: '#134c9c' }}>{t.contact}</span></div>
// //                         </div>
// //                         <div style={{ textAlign: 'left' }}>
// //                           <div style={{ color: '#134c9c', fontWeight: 600 }}>Constituency: <span style={{ color: '#0d47a1' }}>{t.constituency}</span></div>
// //                           <div style={{ color: '#134c9c', fontWeight: 600, marginTop: 4 }}>Gotra: <span style={{ color: '#0d47a1' }}>{t.gotra}</span></div>
// //                           <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
// //                             <button onClick={() => downloadTicket(t)} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '0.55em 1.1em', fontWeight: 700, cursor: 'pointer' }}>Download</button>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //                 <button className="modal-close" onClick={() => setShowTicket(false)} style={{ marginTop: 12, width: '100%' }}>Close</button>
// //               </div>
// //             ) : (
// //               <div style={{ padding: 32, textAlign: 'center' }}>No ticket found.</div>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //       {submitted ? (
// //         <div>
// //           {latestTicket && (
// //             <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
// //               <button
// //                 type="button"
// //                 onClick={() => downloadTicket(latestTicket)}
// //                 title={lang === 'hi' ? 'टिकट डाउनलोड करें' : 'Download Ticket'}
// //                 style={{
// //                   display: 'inline-flex',
// //                   alignItems: 'center',
// //                   gap: 8,
// //                   background: '#1976d2',
// //                   color: '#fff',
// //                   border: 'none',
// //                   borderRadius: 10,
// //                   padding: '0.6rem 1rem',
// //                   fontWeight: 700,
// //                   cursor: 'pointer',
// //                   boxShadow: '0 2px 8px rgba(25,118,210,0.18)'
// //                 }}
// //               >
// //                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
// //                 {lang === 'hi' ? 'टिकट डाउनलोड करें' : 'Download Ticket'}
// //               </button>
// //             </div>
// //           )}
// //           <div className="success-msg">{t.thankYou}</div>
// //         </div>
// //       ) : (
// //         <form className="reg-form" onSubmit={handleSubmit} autoComplete="off">
          
// //             <input type="text" name="firstName" placeholder={lang === 'hi' ? 'पहला नाम *' : 'First Name *'} value={form.firstName} onChange={handleChange} required />
// //             <input type="text" name="lastName" placeholder={lang === 'hi' ? 'अंतिम नाम *' : 'Last Name *'} value={form.lastName} onChange={handleChange} required />
// //             <input type="text" name="gotra" value={form.gotra} onChange={handleChange} required placeholder={t.gotra} autoComplete="off" />
// //             <input type="tel" name="contact" placeholder={t.contact} value={form.contact} onChange={handleChange} required pattern="[6-9][0-9]{9}" maxLength={10} autoComplete="off" />
// //             <input type="tel" name="age" placeholder={t.age} value={form.age} onChange={handleChange} required pattern="[0-9]{2}" maxLength={2} autoComplete="off" />
          
// //             <div className="radio-label">
// //               {t.gender}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// //               <label><input type="radio" name="gender" value="Male" checked={form.gender === 'Male'} onChange={handleChange} required /> {t.male}</label>
// //               <label><input type="radio" name="gender" value="Female" checked={form.gender === 'Female'} onChange={handleChange} /> {t.female}</label>
// //             </div>
          
// //             <select name="constituency" value={form.constituency} onChange={handleChange} required>
// //               <option value={""} disabled hidden selected>{t.constituency}</option>
// //               {constituencyOptions.map((c) => (
// //                 <option key={c.value} value={c.value}>{lang === 'hi' ? c.hi : c.en}</option>
// //               ))}
// //             </select>
          
// //             <select name="tshirt" value={form.tshirt} onChange={handleChange} required>
// //               <option value={""} disabled hidden selected>{t.tshirt}</option>
// //               {tshirtSizes.map((s) => (
// //                 <option key={s.value} value={s.value}>{lang === 'hi' ? s.hi : s.en}</option>
// //               ))}
// //             </select>
// //           {error && <div className="error-msg">{error}</div>}
// //           <button disabled={submitting} type="submit">{t.submit}</button>
// //         </form>
// //       )}
// //     </div>
// //   );
// // }

// // function formatTicketId(id) {
// //   const str = String(id || '');
// //   return str.padStart(4, '0');
// // }

// // function downloadTicket(ticket) {
// //   const paddedId = formatTicketId(ticket.id);
// //   // Enhanced ticket SVG design
// //   const svg = `<svg width='640' height='280' xmlns='http://www.w3.org/2000/svg'>
// //     <defs>
// //       <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
// //         <stop offset='0%' stop-color='#1976d2'/>
// //         <stop offset='100%' stop-color='#42a5f5'/>
// //       </linearGradient>
// //       <filter id='shadow' x='-20%' y='-20%' width='140%' height='140%'>
// //         <feDropShadow dx='0' dy='4' stdDeviation='6' flood-color='rgba(0,0,0,0.25)'/>
// //       </filter>
// //       <pattern id='dots' width='6' height='6' patternUnits='userSpaceOnUse'>
// //         <circle cx='1' cy='1' r='1' fill='rgba(255,255,255,0.15)' />
// //       </pattern>
// //     </defs>
// //     <rect width='640' height='280' rx='28' fill='url(#bg)' filter='url(#shadow)' />
// //     <rect x='10' y='10' width='620' height='260' rx='22' fill='#ffffff' />
// //     <rect x='10' y='10' width='620' height='260' rx='22' fill='url(#dots)' />
// //     <circle cx='140' cy='140' r='10' fill='#e3f2fd' />
// //     <circle cx='500' cy='140' r='10' fill='#e3f2fd' />
// //     <line x1='140' y1='30' x2='140' y2='250' stroke='#bbdefb' stroke-width='3' stroke-dasharray='6 8' />
// //     <text x='90' y='64' text-anchor='middle' font-size='14' font-family='Montserrat,sans-serif' fill='#5a7bb8' font-weight='700' letter-spacing='2'>TICKET</text>
// //     <text x='90' y='92' text-anchor='middle' font-size='28' font-family='Montserrat,sans-serif' fill='#0d47a1' font-weight='800'>${paddedId}</text>
// //     <text x='180' y='80' font-size='20' font-family='Montserrat,sans-serif' fill='#0d47a1' font-weight='800'>${escapeXml(ticket.name)}</text>
// //     <text x='180' y='112' font-size='16' font-family='Montserrat,sans-serif' fill='#1e88e5' font-weight='600'>Contact: <tspan fill='#134c9c'>${escapeXml(ticket.contact)}</tspan></text>
// //     <text x='180' y='144' font-size='16' font-family='Montserrat,sans-serif' fill='#1e88e5' font-weight='600'>Constituency: <tspan fill='#134c9c'>${escapeXml(ticket.constituency)}</tspan></text>
// //     <text x='180' y='176' font-size='16' font-family='Montserrat,sans-serif' fill='#1e88e5' font-weight='600'>Gotra: <tspan fill='#134c9c'>${escapeXml(ticket.gotra)}</tspan></text>
// //     <text x='320' y='228' text-anchor='middle' font-size='14' font-family='Montserrat,sans-serif' fill='#5a7bb8' font-weight='700'>अग्रचेतना मैराथॉन 2025</text>
// //   </svg>`;
// //   const blob = new Blob([svg], { type: 'image/svg+xml' });
// //   const url = URL.createObjectURL(blob);
// //   const img = new window.Image();
// //   img.onload = function() {
// //     const canvas = document.createElement('canvas');
// //     canvas.width = 640;
// //     canvas.height = 280;
// //     const ctx = canvas.getContext('2d');
// //     ctx.drawImage(img, 0, 0);
// //     canvas.toBlob(function(blob) {
// //       const a = document.createElement('a');
// //       a.href = URL.createObjectURL(blob);
// //       a.download = `marathon_ticket_${paddedId}.png`;
// //       a.click();
// //       URL.revokeObjectURL(url);
// //     }, 'image/png');
// //   };
// //   img.src = url;
// // }

// // function escapeXml(unsafe) {
// //   if (unsafe == null) return '';
// //   return String(unsafe)
// //     .replace(/&/g, '&amp;')
// //     .replace(/</g, '&lt;')
// //     .replace(/>/g, '&gt;')
// //     .replace(/"/g, '&quot;')
// //     .replace(/'/g, '&#039;');
// // }













// import { useState } from 'react';
// import '../App.css';
// import logo from './logo.png';

// const constituencyOptions = [
//   { value: 'Vidhyadhar nagar', hi: 'विद्याधर नगर', en: 'Vidhyadhar nagar' },
//   { value: 'Jhotwara', hi: 'झोटवाड़ा', en: 'Jhotwara' },
//   { value: 'Kishanpole', hi: 'किशनपोल', en: 'Kishanpole' },
//   { value: 'Aamer', hi: 'आमेर', en: 'Amer' },
//   { value: 'Bagru', hi: 'बागरू', en: 'Bagru' },
//   { value: 'Sanganer', hi: 'सांगानेर', en: 'Sanganer' },
//   { value: 'Malviya Nagar', hi: 'मालवीय नगर', en: 'Malviya Nagar' },
//   { value: 'Adarsh nagar', hi: 'आदर्श नगर', en: 'Adarsh nagar' },
//   { value: 'Hawa Mahal', hi: 'हवा महल', en: 'Hawa Mahal' },
//   { value: 'Civil lines', hi: 'सिविल लाइन्स', en: 'Civil lines' }
// ];
// const tshirtSizes = [
//   { value: 'S', hi: 'छोटा (S)', en: 'Small (S)' },
//   { value: 'M', hi: 'मध्यम (M)', en: 'Medium (M)' },
//   { value: 'L', hi: 'बड़ा (L)', en: 'Large (L)' },
//   { value: 'XL', hi: 'एक्स्ट्रा बड़ा (XL)', en: 'X-Large (XL)' },
//   { value: 'XXL', hi: 'डबल एक्स्ट्रा बड़ा (XXL)', en: 'XX-Large (XXL)' },
// ];

// const i18n = {
//   hi: {
//     title: 'अग्रचेतना मैराथॉन 2025',
//     subtitle: 'अग्रचेतना मैराथॉन 21 सितम्बर 2025 सुबह 6 :00  बजे जय क्लब से शुरू होकर अग्रवाल कॉलेज जाएगी ',
//     fullName: 'पूरा नाम *',
//     contact: 'संपर्क नंबर *',
//     age : 'उम्र *',
//     gender: 'लिंग *',
//     male: 'पुरुष',
//     female: 'महिला',
//     other: 'अन्य',
//     constituency: 'विधानसभा',
//     gotra: 'गोत्र *',
//     tshirt: 'टी-शर्ट साइज *',
//     submit: 'रजिस्टर करें',
//     thankYou: 'पंजीकरण करने के लिए धन्यवाद!',
//     already: 'आप इस डिवाइस से पहले ही पंजीकरण कर चुके हैं।',
//     select: 'चुनें'
//   },
//   en: {
//     title: 'अग्रचेतना मैराथॉन 2025',
//     subtitle: 'अग्रचेतना मैराथॉन 21 सितम्बर 2025 सुबह 6 :00  बजे जय क्लब से शुरू होकर अग्रवाल कॉलेज जाएगी ',
//     fullName: 'Full Name *',
//     age : 'Age *',
//     contact: 'Contact Number *',
//     gender: 'Gender *',
//     male: 'Male',
//     female: 'Female',
//     other: 'Other',
//     constituency: 'विधानसभा',
//     gotra: 'Gotra *',
//     tshirt: 'T-shirt size *',
//     submit: 'Register',
//     thankYou: 'Thank you for registering!',
//     already: 'You have already registered from this device.',
//     select: 'Select'
//   }
// };

// export default function RegistrationForm() {
//   const [lang, setLang] = useState('hi');
//   const t = i18n[lang];

//   const [form, setForm] = useState({
//     firstName: '',
//     lastName: '',
//     contact: '',
//     age : '',
//     gender: '',
//     constituency: '',
//     gotra: '',
//     tshirt: ''
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [tickets, setTickets] = useState(() => {
//     try {
//       // Migrate older single-ticket storage to an array
//       const single = window.localStorage.getItem('marathon_ticket');
//       const list = window.localStorage.getItem('marathon_tickets');
//       let parsedList = list ? JSON.parse(list) : [];
//       if ((!list || parsedList.length === 0) && single) {
//         const t = JSON.parse(single);
//         parsedList = Array.isArray(t) ? t : [t];
//         window.localStorage.setItem('marathon_tickets', JSON.stringify(parsedList));
//         window.localStorage.removeItem('marathon_ticket');
//       }
//       return Array.isArray(parsedList) ? parsedList : [];
//     } catch {
//       return [];
//     }
//   });
//   const [latestTicket, setLatestTicket] = useState(null);
//   const [showTicket, setShowTicket] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     if (submitting) return;
//     setSubmitting(true);
//     e.preventDefault();
//     setError('');
//     try {
//       const payload = {
//         ...form,
//         fullName: `${form.firstName} ${form.lastName}`.trim(),
//       };
//       delete payload.firstName;
//       delete payload.lastName;
//       const res = await fetch('https://codeup.in/dev/register-marathon', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         if (data.error && data.error.includes('maximum')) {
//           setError(lang === 'hi' ? 'एक संपर्क नंबर से अधिकतम 2 पंजीकरण हो सकते हैं।' : 'Maximum 2 registrations allowed per contact number.');
//         } else {
//           throw new Error(data.error || 'Submission failed');
//         }
//         return;
//       }
//       setSubmitted(true);
//       if (data.ticket) {
//         setLatestTicket(data.ticket);
//         setTickets((prev) => {
//           const exists = prev.some((t) => String(t.id) === String(data.ticket.id));
//           const updated = exists ? prev : [...prev, data.ticket];
//           window.localStorage.setItem('marathon_tickets', JSON.stringify(updated));
//           return updated;
//         });
//       } else {
//         setLatestTicket(null);
//       }
//     } catch (err) {
//       setError(lang === 'hi' ? 'पंजीकरण विफल हुआ। कृपया पुनः प्रयास करें।' : 'Registration failed. Please try again.');
//     }
//     setSubmitting(false);
//   };

//   return (
//     <div className="reg-form-container">
//       <div className="reg-form-header">
//         <img src={logo} alt="Logo" className="form-logo-img" />
//         <h2>{t.title}</h2>
//         <div className="subtitle-text">{t.subtitle}</div>
//         <div className="lang-toggle">
//           <button type="button" className={`lang-btn ${lang==='hi' ? 'selected' : ''}`} onClick={() => setLang('hi')}>
//             हिन्दी
//           </button>
//           <button type="button" className={`lang-btn ${lang==='en' ? 'selected' : ''}`} onClick={() => setLang('en')}>
//             English
//           </button>
//         </div>
//         {tickets && tickets.length > 0 && (
//           <button
//             className="ticket-icon-btn"
//             title="View Tickets"
//             style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', cursor: 'pointer' }}
//             onClick={() => setShowTicket(true)}
//           >
//             <svg width="32" height="20" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <rect x="2" y="8" width="60" height="24" rx="8" fill="#1976d2" stroke="#fff" strokeWidth="2"/>
//               <circle cx="10" cy="20" r="3" fill="#fff"/>
//               <circle cx="54" cy="20" r="3" fill="#fff"/>
//               <rect x="18" y="14" width="28" height="12" rx="4" fill="#fff"/>
//               <rect x="18" y="14" width="28" height="12" rx="4" fill="#1976d2" fillOpacity="0.15"/>
//             </svg>
//           </button>
//         )}
//       </div>
//       {showTicket && (
//         <div className="modal-overlay" onClick={() => setShowTicket(false)}>
//           <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 460, padding: 16, overflow: 'visible' }}>
//             {tickets && tickets.length > 0 ? (
//               <div>
//                 <h3 style={{ color: '#1976d2', margin: '4px 0 12px' }}>🎟️ Your Tickets</h3>
//                 <div style={{ display: 'grid', gap: 12 }}>
//                   {tickets.map((t) => (
//                     <div key={t.id} style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e8f3ff 100%)', borderRadius: 14, boxShadow: '0 6px 20px rgba(25,118,210,0.12)', padding: 16, position: 'relative', overflow: 'hidden', border: '1px solid #d6e4ff' }}>
//                       <div style={{ position: 'absolute', top: 0, bottom: 0, left: 120, width: 1, borderLeft: '2px dashed #bbd2ff' }} />
//                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'center' }}>
//                         <div style={{ textAlign: 'left' }}>
//                           <div style={{ fontSize: 12, color: '#5a7bb8', fontWeight: 700, letterSpacing: 1 }}>TICKET ID</div>
//                           <div style={{ fontWeight: 800, fontSize: 22, color: '#0d47a1' }}>{formatTicketId(t.id)}</div>
//                           <div style={{ marginTop: 6, fontWeight: 700, color: '#0d47a1' }}>{t.name}</div>
//                           <div style={{ color: '#1e88e5', fontWeight: 600, marginTop: 4 }}>Contact: <span style={{ color: '#134c9c' }}>{t.contact}</span></div>
//                         </div>
//                         <div style={{ textAlign: 'left' }}>
//                           <div style={{ color: '#134c9c', fontWeight: 600 }}>Constituency: <span style={{ color: '#0d47a1' }}>{t.constituency}</span></div>
//                           <div style={{ color: '#134c9c', fontWeight: 600, marginTop: 4 }}>Gotra: <span style={{ color: '#0d47a1' }}>{t.gotra}</span></div>
//                           <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//                             <button onClick={() => downloadTicket(t)} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '0.55em 1.1em', fontWeight: 700, cursor: 'pointer' }}>Download</button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <button className="modal-close" onClick={() => setShowTicket(false)} style={{ marginTop: 12, width: '100%' }}>Close</button>
//               </div>
//             ) : (
//               <div style={{ padding: 32, textAlign: 'center' }}>No ticket found.</div>
//             )}
//           </div>
//         </div>
//       )}
//       {submitted ? (
//         <div>
//           {latestTicket && (
//             <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
//               <button
//                 type="button"
//                 onClick={() => downloadTicket(latestTicket)}
//                 title={lang === 'hi' ? 'टिकट डाउनलोड करें' : 'Download Ticket'}
//                 style={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   gap: 8,
//                   background: '#1976d2',
//                   color: '#fff',
//                   border: 'none',
//                   borderRadius: 10,
//                   padding: '0.6rem 1rem',
//                   fontWeight: 700,
//                   cursor: 'pointer',
//                   boxShadow: '0 2px 8px rgba(25,118,210,0.18)'
//                 }}
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
//                 {lang === 'hi' ? 'टिकट डाउनलोड करें' : 'Download Ticket'}
//               </button>
//             </div>
//           )}
//           <div className="success-msg">{t.thankYou}</div>
//         </div>
//       ) : (
//         <form className="reg-form" onSubmit={handleSubmit} autoComplete="off">
          
//             <input type="text" name="firstName" placeholder={lang === 'hi' ? 'पहला नाम *' : 'First Name *'} value={form.firstName} onChange={handleChange} required />
//             <input type="text" name="lastName" placeholder={lang === 'hi' ? 'अंतिम नाम *' : 'Last Name *'} value={form.lastName} onChange={handleChange} required />
//             <input type="text" name="gotra" value={form.gotra} onChange={handleChange} required placeholder={t.gotra} autoComplete="off" />
//             <input type="tel" name="contact" placeholder={t.contact} value={form.contact} onChange={handleChange} required pattern="[6-9][0-9]{9}" maxLength={10} autoComplete="off" />
//             <input type="tel" name="age" placeholder={t.age} value={form.age} onChange={handleChange} required pattern="[0-9]{2}" maxLength={2} autoComplete="off" />
          
//             <div className="radio-label">
//               {t.gender}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//               <label><input type="radio" name="gender" value="Male" checked={form.gender === 'Male'} onChange={handleChange} required /> {t.male}</label>
//               <label><input type="radio" name="gender" value="Female" checked={form.gender === 'Female'} onChange={handleChange} /> {t.female}</label>
//             </div>
          
//             <select name="constituency" value={form.constituency} onChange={handleChange} required>
//               <option value={""} disabled hidden selected>{t.constituency}</option>
//               {constituencyOptions.map((c) => (
//                 <option key={c.value} value={c.value}>{lang === 'hi' ? c.hi : c.en}</option>
//               ))}
//             </select>
          
//             <select name="tshirt" value={form.tshirt} onChange={handleChange} required>
//               <option value={""} disabled hidden selected>{t.tshirt}</option>
//               {tshirtSizes.map((s) => (
//                 <option key={s.value} value={s.value}>{lang === 'hi' ? s.hi : s.en}</option>
//               ))}
//             </select>
//           {error && <div className="error-msg">{error}</div>}
//           <button disabled={submitting} type="submit">{t.submit}</button>
//         </form>
//       )}
//     </div>
//   );
// }

// function formatTicketId(id) {
//   const str = String(id || '');
//   return str.padStart(4, '0');
// }

// function downloadTicket(ticket) {
//   const paddedId = formatTicketId(ticket.id);
//   // Enhanced ticket SVG design with header image
//   const svg = `<svg width='800' height='400' xmlns='http://www.w3.org/2000/svg'>
//     <defs>
//       <linearGradient id='headerGrad' x1='0' y1='0' x2='1' y2='0'>
//         <stop offset='0%' stop-color='#ff6b35'/>
//         <stop offset='50%' stop-color='#f7931e'/>
//         <stop offset='100%' stop-color='#ffd700'/>
//       </linearGradient>
//       <linearGradient id='bgGrad' x1='0' y1='0' x2='1' y2='1'>
//         <stop offset='0%' stop-color='#1976d2'/>
//         <stop offset='50%' stop-color='#1565c0'/>
//         <stop offset='100%' stop-color='#0d47a1'/>
//       </linearGradient>
//       <linearGradient id='cardGrad' x1='0' y1='0' x2='0' y2='1'>
//         <stop offset='0%' stop-color='#ffffff'/>
//         <stop offset='100%' stop-color='#f8f9ff'/>
//       </linearGradient>
//       <filter id='shadow' x='-20%' y='-20%' width='140%' height='140%'>
//         <feDropShadow dx='0' dy='8' stdDeviation='12' flood-color='rgba(0,0,0,0.25)'/>
//       </filter>
//       <filter id='innerShadow' x='-50%' y='-50%' width='200%' height='200%'>
//         <feOffset dx='0' dy='2'/>
//         <feGaussianBlur stdDeviation='3' result='offset-blur'/>
//         <feFlood flood-color='rgba(0,0,0,0.1)'/>
//         <feComposite in2='offset-blur' operator='in'/>
//       </filter>
//       <pattern id='dots' width='12' height='12' patternUnits='userSpaceOnUse'>
//         <circle cx='2' cy='2' r='1' fill='rgba(25,118,210,0.08)' />
//       </pattern>
//     </defs>
    
//     <!-- Main ticket background -->
//     <rect width='800' height='400' rx='32' fill='url(#bgGrad)' filter='url(#shadow)' />
    
//     <!-- White card background -->
//     <rect x='16' y='16' width='768' height='368' rx='24' fill='url(#cardGrad)' />
//     <rect x='16' y='16' width='768' height='368' rx='24' fill='url(#dots)' />
    
//     <!-- Header section with image -->
//     <rect x='16' y='16' width='768' height='120' rx='24' fill='url(#headerGrad)' />
//     <rect x='16' y='136' width='768' height='1' fill='rgba(25,118,210,0.1)' />
    
//     <!-- Header logo (running person icon) -->
//     <rect x='60' y='36' width='80' height='80' rx='40' fill='#ffffff' stroke='rgba(255,255,255,0.3)' stroke-width='3'/>
//     <!-- Running person icon -->
//     <g transform='translate(100, 76) scale(0.8)'>
//       <!-- Head -->
//       <circle cx='0' cy='-15' r='6' fill='#1976d2'/>
//       <!-- Body -->
//       <line x1='0' y1='-9' x2='0' y2='8' stroke='#1976d2' stroke-width='4' stroke-linecap='round'/>
//       <!-- Arms -->
//       <line x1='0' y1='-2' x2='-8' y2='2' stroke='#1976d2' stroke-width='3' stroke-linecap='round'/>
//       <line x1='0' y1='-2' x2='10' y2='-6' stroke='#1976d2' stroke-width='3' stroke-linecap='round'/>
//       <!-- Legs -->
//       <line x1='0' y1='8' x2='-6' y2='18' stroke='#1976d2' stroke-width='3' stroke-linecap='round'/>
//       <line x1='0' y1='8' x2='8' y2='16' stroke='#1976d2' stroke-width='3' stroke-linecap='round'/>
//       <!-- Motion lines -->
//       <line x1='-18' y1='-5' x2='-12' y2='-5' stroke='#ffd700' stroke-width='2' stroke-linecap='round'/>
//       <line x1='-18' y1='0' x2='-10' y2='0' stroke='#ffd700' stroke-width='2' stroke-linecap='round'/>
//       <line x1='-18' y1='5' x2='-14' y2='5' stroke='#ffd700' stroke-width='2' stroke-linecap='round'/>
//     </g>
    
//     <!-- Event title in header -->
//     <text x='170' y='65' font-size='28' font-family='Inter,sans-serif' fill='#ffffff' font-weight='800' letter-spacing='-0.5'>अग्रचेतना मैराथॉन 2025</text>
//     <text x='170' y='95' font-size='16' font-family='Inter,sans-serif' fill='rgba(255,255,255,0.9)' font-weight='600'>21 सितम्बर 2025 • सुबह 6:00 बजे</text>
    
//     <!-- Ticket perforation line -->
//     <line x1='200' y1='160' x2='200' y2='360' stroke='#e0e7ff' stroke-width='2' stroke-dasharray='8 12' />
    
//     <!-- Left section - Ticket ID -->
//     <circle cx='100' cy='260' r='12' fill='#e3f2fd' />
//     <text x='100' y='200' text-anchor='middle' font-size='14' font-family='Inter,sans-serif' fill='#64748b' font-weight='700' letter-spacing='2'>TICKET ID</text>
//     <text x='100' y='235' text-anchor='middle' font-size='36' font-family='Inter,sans-serif' fill='#0f172a' font-weight='900'>${paddedId}</text>
    
//     <!-- Decorative elements -->
//     <circle cx='100' cy='300' r='4' fill='#3b82f6' opacity='0.2'/>
//     <circle cx='85' cy='315' r='3' fill='#8b5cf6' opacity='0.2'/>
//     <circle cx='115' cy='320' r='2' fill='#f59e0b' opacity='0.3'/>
    
//     <!-- Right section - Participant details -->
//     <text x='240' y='180' font-size='24' font-family='Inter,sans-serif' fill='#0f172a' font-weight='800'>${escapeXml(ticket.name)}</text>
    
//     <!-- Contact info with icon -->
//     <circle cx='250' cy='205' r='8' fill='#10b981' opacity='0.1'/>
//     <path d='M246 201 h8 v8 h-8 z M248 203 l2 2 l2 -2' stroke='#10b981' stroke-width='1.5' fill='none'/>
//     <text x='270' y='212' font-size='16' font-family='Inter,sans-serif' fill='#374151' font-weight='600'>Contact: <tspan fill='#0f172a' font-weight='700'>${escapeXml(ticket.contact)}</tspan></text>
    
//     <!-- Constituency with icon -->
//     <circle cx='250' cy='235' r='8' fill='#3b82f6' opacity='0.1'/>
//     <rect x='246' y='231' width='8' height='8' rx='1' stroke='#3b82f6' stroke-width='1.5' fill='none'/>
//     <text x='270' y='242' font-size='16' font-family='Inter,sans-serif' fill='#374151' font-weight='600'>Constituency: <tspan fill='#0f172a' font-weight='700'>${escapeXml(ticket.constituency)}</tspan></text>
    
//     <!-- Gotra with icon -->
//     <circle cx='250' cy='265' r='8' fill='#8b5cf6' opacity='0.1'/>
//     <circle cx='250' cy='265' r='3' stroke='#8b5cf6' stroke-width='1.5' fill='none'/>
//     <text x='270' y='272' font-size='16' font-family='Inter,sans-serif' fill='#374151' font-weight='600'>Gotra: <tspan fill='#0f172a' font-weight='700'>${escapeXml(ticket.gotra)}</tspan></text>
    
//     <!-- T-shirt size with icon -->
//     <circle cx='250' cy='295' r='8' fill='#f59e0b' opacity='0.1'/>
//     <rect x='246' y='291' width='8' height='8' rx='2' stroke='#f59e0b' stroke-width='1.5' fill='none'/>
//     <text x='270' y='302' font-size='16' font-family='Inter,sans-serif' fill='#374151' font-weight='600'>T-shirt: <tspan fill='#0f172a' font-weight='700'>${escapeXml(ticket.tshirt)}</tspan></text>
    
//     <!-- Age with icon -->
//     <circle cx='250' cy='325' r='8' fill='#ef4444' opacity='0.1'/>
//     <text x='246' y='330' font-size='10' font-family='Inter,sans-serif' fill='#ef4444' font-weight='700'>${escapeXml(ticket.age || 'N/A')}</text>
//     <text x='270' y='332' font-size='16' font-family='Inter,sans-serif' fill='#374151' font-weight='600'>Age: <tspan fill='#0f172a' font-weight='700'>${escapeXml(ticket.age || 'N/A')} years</tspan></text>
    
//     <!-- Bottom decorative line -->
//     <rect x='240' y='350' width='300' height='2' rx='1' fill='url(#headerGrad)' opacity='0.3'/>
    
//     <!-- QR code placeholder -->
//     <rect x='600' y='180' width='120' height='120' rx='8' fill='#f1f5f9' stroke='#e2e8f0' stroke-width='2'/>
//     <rect x='610' y='190' width='100' height='100' rx='4' fill='#0f172a'/>
//     <rect x='615' y='195' width='10' height='10' fill='#ffffff'/>
//     <rect x='630' y='195' width='10' height='10' fill='#ffffff'/>
//     <rect x='645' y='195' width='10' height='10' fill='#ffffff'/>
//     <rect x='675' y='195' width='10' height='10' fill='#ffffff'/>
//     <rect x='690' y='195' width='10' height='10' fill='#ffffff'/>
//     <rect x='615' y='210' width='10' height='10' fill='#ffffff'/>
//     <rect x='645' y='210' width='10' height='10' fill='#ffffff'/>
//     <rect x='690' y='210' width='10' height='10' fill='#ffffff'/>
//     <rect x='615' y='225' width='25' height='10' fill='#ffffff'/>
//     <rect x='660' y='225' width='25' height='10' fill='#ffffff'/>
//     <rect x='630' y='240' width='40' height='10' fill='#ffffff'/>
//     <rect x='615' y='255' width='10' height='25' fill='#ffffff'/>
//     <rect x='645' y='255' width='10' height='10' fill='#ffffff'/>
//     <rect x='675' y='255' width='25' height='10' fill='#ffffff'/>
//     <rect x='630' y='270' width='10' height='10' fill='#ffffff'/>
//     <rect x='660' y='270' width='10' height='10' fill='#ffffff'/>
//     <rect x='690' y='270' width='10' height='10' fill='#ffffff'/>
    
//     <text x='660' y='320' text-anchor='middle' font-size='12' font-family='Inter,sans-serif' fill='#64748b' font-weight='600'>SCAN FOR DETAILS</text>
    
//     <!-- Corner decorative elements -->
//     <circle cx='750' cy='50' r='20' fill='rgba(255,255,255,0.1)'/>
//     <circle cx='50' cy='350' r='15' fill='rgba(25,118,210,0.1)'/>
//   </svg>`;
  
//   const blob = new Blob([svg], { type: 'image/svg+xml' });
//   const url = URL.createObjectURL(blob);
//   const img = new window.Image();
//   img.onload = function() {
//     const canvas = document.createElement('canvas');
//     canvas.width = 800;
//     canvas.height = 400;
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(img, 0, 0);
//     canvas.toBlob(function(blob) {
//       const a = document.createElement('a');
//       a.href = URL.createObjectURL(blob);
//       a.download = `marathon_ticket_${paddedId}.png`;
//       a.click();
//       URL.revokeObjectURL(url);
//     }, 'image/png');
//   };
//   img.src = url;
// }

// function escapeXml(unsafe) {
//   if (unsafe == null) return '';
//   return String(unsafe)
//     .replace(/&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;')
//     .replace(/"/g, '&quot;')
//     .replace(/'/g, '&#039;');
// }












import { useState } from 'react';
import html2canvas from 'html2canvas';
import '../App.css';
import logo from './logo.png';

const constituencyOptions = [
  { value: 'Vidhyadhar nagar', hi: 'विद्याधर नगर', en: 'Vidhyadhar nagar' },
  { value: 'Jhotwara', hi: 'झोटवाड़ा', en: 'Jhotwara' },
  { value: 'Kishanpole', hi: 'किशनपोल', en: 'Kishanpole' },
  { value: 'Aamer', hi: 'आमेर', en: 'Amer' },
  { value: 'Bagru', hi: 'बागरू', en: 'Bagru' },
  { value: 'Sanganer', hi: 'सांगानेर', en: 'Sanganer' },
  { value: 'Malviya Nagar', hi: 'मालवीय नगर', en: 'Malviya Nagar' },
  { value: 'Adarsh nagar', hi: 'आदर्श नगर', en: 'Adarsh nagar' },
  { value: 'Hawa Mahal', hi: 'हवा महल', en: 'Hawa Mahal' },
  { value: 'Civil lines', hi: 'सिविल लाइन्स', en: 'Civil lines' }
];

const tshirtSizes = [
  { value: 'S', hi: 'छोटा (S)', en: 'Small (S)' },
  { value: 'M', hi: 'मध्यम (M)', en: 'Medium (M)' },
  { value: 'L', hi: 'बड़ा (L)', en: 'Large (L)' },
  { value: 'XL', hi: 'एक्स्ट्रा बड़ा (XL)', en: 'X-Large (XL)' },
  { value: 'XXL', hi: 'डबल एक्स्ट्रा बड़ा (XXL)', en: 'XX-Large (XXL)' },
];

const i18n = {
  hi: {
    title: 'अग्रचेतना मैराथॉन 2025',
    subtitle: 'अग्रचेतना मैराथॉन 21 सितम्बर 2025 सुबह 6 :00  बजे जय क्लब से शुरू होकर अग्रवाल कॉलेज जाएगी ',
    fullName: 'पूरा नाम *',
    contact: 'संपर्क नंबर *',
    age : 'उम्र *',
    gender: 'लिंग *',
    male: 'पुरुष',
    female: 'महिला',
    other: 'अन्य',
    constituency: 'विधानसभा',
    gotra: 'गोत्र *',
    tshirt: 'टी-शर्ट साइज *',
    submit: 'रजिस्टर करें',
    thankYou: 'पंजीकरण करने के लिए धन्यवाद!',
    already: 'आप इस डिवाइस से पहले ही पंजीकरण कर चुके हैं।',
    select: 'चुनें'
  },
  en: {
    title: 'अग्रचेतना मैराथॉन 2025',
    subtitle: 'अग्रचेतना मैराथॉन 21 सितम्बर 2025 सुबह 6 :00  बजे जय क्लब से शुरू होकर अग्रवाल कॉलेज जाएगी ',
    fullName: 'Full Name *',
    age : 'Age *',
    contact: 'Contact Number *',
    gender: 'Gender *',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    constituency: 'विधानसभा',
    gotra: 'Gotra *',
    tshirt: 'T-shirt size *',
    submit: 'Register',
    thankYou: 'Thank you for registering!',
    already: 'You have already registered from this device.',
    select: 'Select'
  }
};

export default function RegistrationForm() {
  const [lang, setLang] = useState('hi');
  const t = i18n[lang];

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    age : '',
    gender: '',
    constituency: '',
    gotra: '',
    tshirt: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [tickets, setTickets] = useState(() => {
    try {
      // Migrate older single-ticket storage to an array
      const single = window.localStorage.getItem('marathon_ticket');
      const list = window.localStorage.getItem('marathon_tickets');
      let parsedList = list ? JSON.parse(list) : [];
      if ((!list || parsedList.length === 0) && single) {
        const t = JSON.parse(single);
        parsedList = Array.isArray(t) ? t : [t];
        window.localStorage.setItem('marathon_tickets', JSON.stringify(parsedList));
        window.localStorage.removeItem('marathon_ticket');
      }
      return Array.isArray(parsedList) ? parsedList : [];
    } catch {
      return [];
    }
  });
  const [latestTicket, setLatestTicket] = useState(null);
  const [showTicket, setShowTicket] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (submitting) return;
    setSubmitting(true);
    e.preventDefault();
    setError('');
    try {
      const payload = {
        ...form,
        fullName: `${form.firstName} ${form.lastName}`.trim(),
      };
      delete payload.firstName;
      delete payload.lastName;
      const res = await fetch('https://codeup.in/dev/register-marathon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error && data.error.includes('maximum')) {
          setError(lang === 'hi' ? 'एक संपर्क नंबर से अधिकतम 2 पंजीकरण हो सकते हैं।' : 'Maximum 2 registrations allowed per contact number.');
        } else {
          throw new Error(data.error || 'Submission failed');
        }
        return;
      }
      setSubmitted(true);
      if (data.ticket) {
        setLatestTicket(data.ticket);
        setTickets((prev) => {
          const exists = prev.some((t) => String(t.id) === String(data.ticket.id));
          const updated = exists ? prev : [...prev, data.ticket];
          window.localStorage.setItem('marathon_tickets', JSON.stringify(updated));
          return updated;
        });
      } else {
        setLatestTicket(null);
      }
    } catch (err) {
      setError(lang === 'hi' ? 'पंजीकरण विफल हुआ। कृपया पुनः प्रयास करें।' : 'Registration failed. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="reg-form-container">
      {/* Hidden ticket template for download */}
      <div id="ticket-template" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <TicketTemplate ticket={latestTicket || tickets[0]} />
      </div>

      <div className="reg-form-header">
        <img src={logo} alt="Logo" className="form-logo-img" />
        <h2>{t.title}</h2>
        <div className="subtitle-text">{t.subtitle}</div>
        <div className="lang-toggle">
          <button type="button" className={`lang-btn ${lang==='hi' ? 'selected' : ''}`} onClick={() => setLang('hi')}>
            हिन्दी
          </button>
          <button type="button" className={`lang-btn ${lang==='en' ? 'selected' : ''}`} onClick={() => setLang('en')}>
            English
          </button>
        </div>
        {tickets && tickets.length > 0 && (
          <button
            className="ticket-icon-btn"
            title="View Tickets"
            style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setShowTicket(true)}
          >
            <svg width="32" height="20" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="8" width="60" height="24" rx="8" fill="#1976d2" stroke="#fff" strokeWidth="2"/>
              <circle cx="10" cy="20" r="3" fill="#fff"/>
              <circle cx="54" cy="20" r="3" fill="#fff"/>
              <rect x="18" y="14" width="28" height="12" rx="4" fill="#fff"/>
              <rect x="18" y="14" width="28" height="12" rx="4" fill="#1976d2" fillOpacity="0.15"/>
            </svg>
          </button>
        )}
      </div>
      {showTicket && (
        <div className="modal-overlay" onClick={() => setShowTicket(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 460, padding: 16, overflow: 'visible' }}>
            {tickets && tickets.length > 0 ? (
              <div>
                <h3 style={{ color: '#1976d2', margin: '4px 0 12px' }}>🎟️ Your Tickets</h3>
                <div style={{ display: 'grid', gap: 12 }}>
                  {tickets.map((t) => (
                    <div key={t.id} style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e8f3ff 100%)', borderRadius: 14, boxShadow: '0 6px 20px rgba(25,118,210,0.12)', padding: 16, position: 'relative', overflow: 'hidden', border: '1px solid #d6e4ff' }}>
                      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 120, width: 1, borderLeft: '2px dashed #bbd2ff' }} />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'center' }}>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: 12, color: '#5a7bb8', fontWeight: 700, letterSpacing: 1 }}>TICKET ID</div>
                          <div style={{ fontWeight: 800, fontSize: 22, color: '#0d47a1' }}>{formatTicketId(t.id)}</div>
                          <div style={{ marginTop: 6, fontWeight: 700, color: '#0d47a1' }}>{t.name}</div>
                          <div style={{ color: '#1e88e5', fontWeight: 600, marginTop: 4 }}>Contact: <span style={{ color: '#134c9c' }}>{t.contact}</span></div>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ color: '#134c9c', fontWeight: 600 }}>Constituency: <span style={{ color: '#0d47a1' }}>{t.constituency}</span></div>
                          <div style={{ color: '#134c9c', fontWeight: 600, marginTop: 4 }}>Gotra: <span style={{ color: '#0d47a1' }}>{t.gotra}</span></div>
                          <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            <button onClick={() => downloadTicket(t)} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '0.55em 1.1em', fontWeight: 700, cursor: 'pointer' }}>Download</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="modal-close" onClick={() => setShowTicket(false)} style={{ marginTop: 12, width: '100%' }}>Close</button>
              </div>
            ) : (
              <div style={{ padding: 32, textAlign: 'center' }}>No ticket found.</div>
            )}
          </div>
        </div>
      )}
      {submitted ? (
        <div>
          {latestTicket && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
              <button
                type="button"
                onClick={() => downloadTicket(latestTicket)}
                title={lang === 'hi' ? 'टिकट डाउनलोड करें' : 'Download Ticket'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#1976d2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  padding: '0.6rem 1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(25,118,210,0.18)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                {lang === 'hi' ? 'टिकट डाउनलोड करें' : 'Download Ticket'}
              </button>
            </div>
          )}
          <div className="success-msg">{t.thankYou}</div>
        </div>
      ) : (
        <form className="reg-form" onSubmit={handleSubmit} autoComplete="off">
          
            <input type="text" name="firstName" placeholder={lang === 'hi' ? 'पहला नाम *' : 'First Name *'} value={form.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder={lang === 'hi' ? 'अंतिम नाम *' : 'Last Name *'} value={form.lastName} onChange={handleChange} required />
            <input type="text" name="gotra" value={form.gotra} onChange={handleChange} required placeholder={t.gotra} autoComplete="off" />
            <input type="tel" name="contact" placeholder={t.contact} value={form.contact} onChange={handleChange} required pattern="[6-9][0-9]{9}" maxLength={10} autoComplete="off" />
            <input type="tel" name="age" placeholder={t.age} value={form.age} onChange={handleChange} required pattern="[0-9]{2}" maxLength={2} autoComplete="off" />
          
            <div className="radio-label">
              {t.gender}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label><input type="radio" name="gender" value="Male" checked={form.gender === 'Male'} onChange={handleChange} required /> {t.male}</label>
              <label><input type="radio" name="gender" value="Female" checked={form.gender === 'Female'} onChange={handleChange} /> {t.female}</label>
            </div>
          
            <select name="constituency" value={form.constituency} onChange={handleChange} required>
              <option value={""} disabled hidden selected>{t.constituency}</option>
              {constituencyOptions.map((c) => (
                <option key={c.value} value={c.value}>{lang === 'hi' ? c.hi : c.en}</option>
              ))}
            </select>
          
            <select name="tshirt" value={form.tshirt} onChange={handleChange} required>
              <option value={""} disabled hidden selected>{t.tshirt}</option>
              {tshirtSizes.map((s) => (
                <option key={s.value} value={s.value}>{lang === 'hi' ? s.hi : s.en}</option>
              ))}
            </select>
          {error && <div className="error-msg">{error}</div>}
          <button disabled={submitting} type="submit">{t.submit}</button>
        </form>
      )}
    </div>
  );
}

// Separate ticket template component
function TicketTemplate({ ticket }) {
  if (!ticket) return null;

  const paddedId = formatTicketId(ticket.id);
  
  return (
    <div style={{
      width: '800px',
      height: '400px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '24px',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: 'white',
      position: 'relative',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      overflow: 'hidden'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%'
      }}></div>
      
      {/* Header image */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img 
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center" 
          alt="Marathon Event"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '6px solid rgba(255,255,255,0.3)',
            objectFit: 'cover',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
        />
      </div>

      {/* Event Title */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          margin: '0 0 8px 0',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          अग्रचेतना मैराथॉन 2025
        </h1>
        <p style={{ 
          fontSize: '16px', 
          margin: '0',
          opacity: '0.9'
        }}>
          21 सितम्बर 2025 • सुबह 6:00 बजे
        </p>
      </div>

      {/* Main content area */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '16px',
        padding: '24px',
        color: '#333',
        display: 'grid',
        gridTemplateColumns: '200px 1fr 150px',
        gap: '24px',
        alignItems: 'center',
        minHeight: '140px'
      }}>
        
        {/* Left section - Ticket ID */}
        <div style={{ textAlign: 'center', borderRight: '2px dashed #ddd', paddingRight: '20px' }}>
          <div style={{ 
            fontSize: '12px', 
            color: '#666',
            fontWeight: 'bold',
            letterSpacing: '2px',
            marginBottom: '8px'
          }}>
            TICKET ID
          </div>
          <div style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            color: '#1976d2',
            lineHeight: '1'
          }}>
            {paddedId}
          </div>
          <div style={{
            width: '60px',
            height: '4px',
            background: 'linear-gradient(90deg, #ff6b35, #f7931e)',
            borderRadius: '2px',
            margin: '12px auto'
          }}></div>
        </div>

        {/* Middle section - Participant details */}
        <div style={{ paddingLeft: '20px' }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            margin: '0 0 16px 0',
            color: '#1976d2'
          }}>
            {ticket.name}
          </h2>
          
          <div style={{ display: 'grid', gap: '8px' }}>
            <div style={{ fontSize: '14px', color: '#555' }}>
              <strong>📱 Contact:</strong> {ticket.contact}
            </div>
            <div style={{ fontSize: '14px', color: '#555' }}>
              <strong>🏛️ Constituency:</strong> {ticket.constituency}
            </div>
            <div style={{ fontSize: '14px', color: '#555' }}>
              <strong>🏺 Gotra:</strong> {ticket.gotra}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '4px' }}>
              <div style={{ fontSize: '14px', color: '#555' }}>
                <strong>👕 T-shirt:</strong> {ticket.tshirt}
              </div>
              <div style={{ fontSize: '14px', color: '#555' }}>
                <strong>🎂 Age:</strong> {ticket.age || 'N/A'} years
              </div>
            </div>
          </div>
        </div>

        {/* Right section - QR Code */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '120px',
            height: '120px',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold',
            textAlign: 'center',
            margin: '0 auto'
          }}>
            QR CODE<br/>PLACEHOLDER
          </div>
          <div style={{ 
            fontSize: '10px', 
            color: '#666', 
            marginTop: '8px',
            fontWeight: 'bold'
          }}>
            SCAN FOR DETAILS
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px',
        height: '4px',
        background: 'linear-gradient(90deg, #ff6b35, #f7931e, #ffd700)',
        borderRadius: '2px',
        opacity: '0.8'
      }}></div>

      {/* Corner decorations */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        width: '40px',
        height: '40px',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '50%'
      }}></div>
      
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '30px',
        height: '30px',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '50%'
      }}></div>
    </div>
  );
}

function formatTicketId(id) {
  const str = String(id || '');
  return str.padStart(4, '0');
}

async function downloadTicket(ticket) {
  try {
    // Update the hidden ticket template with current ticket data
    const ticketElement = document.getElementById('ticket-template');
    if (!ticketElement) return;

    // Temporarily make it visible for rendering
    ticketElement.style.position = 'fixed';
    ticketElement.style.left = '0';
    ticketElement.style.top = '0';
    ticketElement.style.zIndex = '-1000';
    ticketElement.style.opacity = '1';

    // Re-render with current ticket
    ticketElement.innerHTML = '';
    const tempDiv = document.createElement('div');
    tempDiv.appendChild(TicketTemplate({ ticket }));
    ticketElement.appendChild(tempDiv.firstChild);

    // Wait for images to load
    const images = ticketElement.querySelectorAll('img');
    await Promise.all([...images].map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }));

    // Generate canvas
    const canvas = await html2canvas(ticketElement.firstChild, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
      allowTaint: true,
      width: 800,
      height: 400
    });

    // Hide the template again
    ticketElement.style.position = 'absolute';
    ticketElement.style.left = '-9999px';
    ticketElement.style.top = '-9999px';

    // Download the image
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `marathon_ticket_${formatTicketId(ticket.id)}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');

  } catch (error) {
    console.error('Error generating ticket:', error);
    alert('Error generating ticket. Please try again.');
  }
}