// India Election Data
"use strict";

const DATA_IN_FEDERAL = {
  TL: [
    {id:1,label:"Election\nAnnounced",icon:"\u{1F4E2}",title:"Election Commission Announcement",desc:"The Election Commission of India (ECI) announces election dates and the Model Code of Conduct (MCC) comes into effect. All political parties must adhere to strict guidelines from this point.",meta:["6-8 weeks before polls","MCC in effect"]},
    {id:2,label:"Nomination\nFiling",icon:"\u{1F4DD}",title:"Nomination of Candidates",desc:"Candidates file nomination papers with the Returning Officer. They must submit affidavits declaring criminal records, assets, liabilities, and educational qualifications. A security deposit is required.",meta:["2-3 weeks window","Affidavit required"]},
    {id:3,label:"Scrutiny of\nNominations",icon:"\u{1F50D}",title:"Scrutiny of Nominations",desc:"The Returning Officer examines all nomination papers for validity. Incomplete or incorrect papers are rejected. Candidates must meet age, citizenship, and constituency requirements.",meta:["1 day after filing ends","Papers verified"]},
    {id:4,label:"Withdrawal\nDeadline",icon:"\u{23F0}",title:"Withdrawal of Candidature",desc:"Candidates may withdraw their nominations before the deadline. After this date, the final list of contesting candidates is published and ballot/EVM order is finalized.",meta:["2 days after scrutiny","Final candidate list"]},
    {id:5,label:"Campaign\nPeriod",icon:"\u{1F4E3}",title:"Election Campaigning",desc:"Parties and candidates campaign through rallies, roadshows, door-to-door canvassing, and media. Campaigning must stop 48 hours before polling begins (silence period).",meta:["Ends 48hrs before poll","Rallies & Roadshows"]},
    {id:6,label:"Multi-Phase\nPolling",icon:"\u{1F5F3}",title:"Polling Day(s) — Multi-Phase Voting",desc:"India conducts elections in multiple phases across different states to ensure security and logistics. Voters use Electronic Voting Machines (EVMs) with VVPAT verification slips.",meta:["Multiple phases","EVM + VVPAT"]},
    {id:7,label:"Counting\nDay",icon:"\u{1F4CA}",title:"Vote Counting & Results",desc:"EVMs are stored securely and counted on the designated counting day. Results typically emerge within hours. The Election Commission announces constituency-wise results throughout the day.",meta:["Single counting day","Real-time results"]},
    {id:8,label:"Government\nFormation",icon:"\u{1F3DB}",title:"Government Formation",desc:"The party or coalition with a majority (272+ seats in Lok Sabha) is invited by the President to form the government. The PM is sworn in, followed by the Council of Ministers.",meta:["Within days of results","272 seats needed"]}
  ],

  OV: [
    {icon:"\u{1F4CB}",title:"Voter Registration",desc:"Register on the National Voter Service Portal (NVSP) or through Form 6. Get your EPIC (Voter ID) card to participate in elections."},
    {icon:"\u{1F5F3}",title:"Multi-Phase Polling",desc:"Elections are conducted in multiple phases across states to manage logistics, security, and ensure free & fair voting."},
    {icon:"\u{1F5A5}",title:"EVM & VVPAT",desc:"India uses Electronic Voting Machines with Voter Verified Paper Audit Trail for transparent and tamper-proof elections."},
    {icon:"\u{1F3DB}",title:"Election Commission",desc:"The ECI is an autonomous constitutional body that supervises and conducts all elections in India."},
    {icon:"\u{274C}",title:"NOTA Option",desc:"Voters can choose 'None of the Above' (NOTA) if they don't wish to vote for any candidate on the ballot."},
    {icon:"\u{1F91D}",title:"Coalition & Government",desc:"The party or alliance with 272+ Lok Sabha seats forms the government. Coalition politics plays a key role in Indian democracy."}
  ],

  PH: [
    {tab:"Registration",icon:"\u{1F4DD}",title:"Voter Registration",sub:"Getting your voice in the world's largest democracy",steps:[
      {t:"Check Eligibility",d:"Must be an Indian citizen, 18+ years on the qualifying date, and ordinarily resident of the constituency."},
      {t:"Choose Registration Method",d:"Register online via NVSP portal, through the Voter Helpline app, or submit Form 6 at your local ERO office."},
      {t:"Provide Documents",d:"Age proof (birth certificate, Aadhaar, passport), address proof, and passport-size photographs."},
      {t:"Get Your EPIC Card",d:"After verification by the BLO (Booth Level Officer), receive your Electoral Photo Identity Card (Voter ID)."}
    ]},
    {tab:"Nomination",icon:"\u{1F4E5}",title:"Candidate Nomination",sub:"How candidates enter the fray",steps:[
      {t:"Filing Papers",d:"Candidates file nomination papers with the Returning Officer along with a security deposit (\u20B925,000 for Lok Sabha)."},
      {t:"Affidavit Disclosure",d:"Mandatory declaration of criminal cases, assets, liabilities, and educational qualifications."},
      {t:"Scrutiny Process",d:"Returning Officer verifies all papers. Invalid or incomplete nominations are rejected."},
      {t:"Symbol Allotment",d:"Recognized parties have reserved symbols. Independents are allotted free symbols by the ECI."}
    ]},
    {tab:"Campaigning",icon:"\u{1F4E3}",title:"Election Campaign",sub:"Reaching voters across the nation",steps:[
      {t:"Model Code of Conduct",d:"Strict rules governing party behavior — no hate speech, no bribing, no misuse of government resources."},
      {t:"Rally & Roadshow Rules",d:"All rallies need permission. Spending limits enforced (\u20B995 lakh for Lok Sabha). Election observers monitor compliance."},
      {t:"Media & Advertising",d:"Paid news is banned. Social media monitoring cells track misinformation. Star campaigners have separate spending rules."},
      {t:"Silence Period",d:"Campaigning must stop 48 hours before polling. No appeals to voters through any medium."}
    ]},
    {tab:"Polling",icon:"\u{1F5F3}",title:"Polling Process",sub:"How 900+ million voters cast their ballots",steps:[
      {t:"Voter Verification",d:"At the booth, officials verify identity using EPIC, Aadhaar, or other approved ID. Indelible ink is applied to the left index finger."},
      {t:"EVM Voting",d:"The voter presses the button next to their chosen candidate on the EVM. A VVPAT slip is displayed for 7 seconds for verification."},
      {t:"NOTA Option",d:"The last button on the EVM is NOTA — allowing voters to reject all candidates while exercising their right."},
      {t:"Accessibility",d:"Special provisions for elderly, disabled, and women voters. Wheelchairs, ramps, and braille ballot available."}
    ]},
    {tab:"Counting",icon:"\u{1F4CA}",title:"Vote Counting",sub:"From EVMs to declared results",steps:[
      {t:"Secure EVM Storage",d:"After polling, EVMs are sealed and stored in strongrooms under 24/7 CCTV and armed guard surveillance."},
      {t:"Counting Day Process",d:"Postal ballots counted first, then EVM rounds. Counting agents from all parties observe the process."},
      {t:"VVPAT Verification",d:"VVPAT slips from randomly selected 5 booths per constituency are cross-checked against EVM results."},
      {t:"Result Declaration",d:"Returning Officer declares the winning candidate. Results are updated live on ECI website and Trends portal."}
    ]},
    {tab:"Government",icon:"\u{1F3DB}",title:"Government Formation",sub:"From election results to governance",steps:[
      {t:"Majority Assessment",d:"A party or coalition needs 272+ seats (simple majority) in the 543-member Lok Sabha to form the government."},
      {t:"President's Invitation",d:"The President invites the leader of the majority party/coalition to form the government as Prime Minister."},
      {t:"Oath of Office",d:"The PM and Council of Ministers take the oath of office at Rashtrapati Bhavan."},
      {t:"Floor Test",d:"If majority is questioned, the PM must prove majority on the floor of the Lok Sabha through a trust vote."}
    ]}
  ],

  CK: [
    {t:"Check Your Voter ID (EPIC)",d:"Verify your name on the electoral roll at NVSP or Voter Helpline app."},
    {t:"Find Your Polling Booth",d:"Search your booth on the ECI website or Voter Helpline app."},
    {t:"Call Voter Helpline 1950",d:"For any election-related queries or complaints."},
    {t:"Research Your Candidates",d:"Check affidavits and backgrounds on MyNeta.info."},
    {t:"Collect Your Voter Slip",d:"BLO will distribute voter slips before election day."},
    {t:"Understand EVM & VVPAT",d:"Know how to use the voting machine and verify your VVPAT slip."},
    {t:"Plan Your Election Day",d:"Know timing, location, and carry valid photo ID."},
    {t:"Check for Ink Mark",d:"Indelible ink on left index finger means you've already voted."}
  ],

  FAQ: [
    {q:"What is the Election Commission of India?",a:"The ECI is an autonomous constitutional body (Article 324) that supervises all elections in India — Lok Sabha, Rajya Sabha, State Assemblies, and Presidential/VP elections. It consists of the Chief Election Commissioner and two Election Commissioners.",c:"process"},
    {q:"How do I register to vote in India?",a:"Register online at voters.eci.gov.in (NVSP portal) or through the Voter Helpline app. Submit Form 6 with age and address proof. You can also visit your local Electoral Registration Officer (ERO).",c:"registration"},
    {q:"What is an EVM and is it safe?",a:"An Electronic Voting Machine (EVM) is a portable device used for voting. It's not connected to any network, runs on battery, and has robust security features. VVPAT machines provide paper verification of each vote cast.",c:"voting"},
    {q:"What is NOTA?",a:"NOTA (None of the Above) is an option on the EVM ballot that allows voters to officially reject all candidates. It was introduced by the Supreme Court in 2013. NOTA votes are counted but don't affect the result.",c:"voting"},
    {q:"Why are Indian elections held in multiple phases?",a:"To ensure adequate deployment of security forces (especially Central Armed Police Forces), election officials, and EVMs. India has 900+ million voters and 1 million+ polling stations — phased polling ensures free and fair elections.",c:"process"},
    {q:"What is the minimum age to vote in India?",a:"You must be 18 years or older on the qualifying date (usually January 1 of the year of electoral roll revision) to be eligible to vote.",c:"registration"},
    {q:"Can NRIs vote in Indian elections?",a:"Yes, since 2011, NRIs with valid Indian passports can register as overseas electors. They must vote in person at their registered constituency. The government is exploring remote voting for NRIs.",c:"registration"},
    {q:"What is the Model Code of Conduct?",a:"The MCC is a set of guidelines for political parties and candidates during elections. It covers speeches, rallies, polling day conduct, and use of government resources. It comes into effect once elections are announced.",c:"process"},
    {q:"How are results declared?",a:"On counting day, postal ballots are counted first, followed by EVM rounds. Counting agents observe. Results are declared constituency-by-constituency. The entire process is usually completed in one day.",c:"results"},
    {q:"How many seats are needed to form the government?",a:"A party or coalition needs 272 out of 543 Lok Sabha seats (simple majority) to form the government. The President invites the majority leader to be Prime Minister.",c:"results"}
  ],

  DEMO: [
    {title:"Register on NVSP",desc:"First, let's register you as a voter on the National Voter Service Portal.",content:'<div class="demo-visual"><div class="demo-form-group"><label for="demo-name">Full Name (as per Aadhaar)</label><input type="text" placeholder="e.g. Priya Sharma" id="demo-name"></div><div class="demo-form-group"><label for="demo-dob">Date of Birth</label><input type="date" id="demo-dob"></div><div class="demo-form-group"><label for="demo-state">State / Union Territory</label><select id="demo-state"><option>Select your state...</option><option>Maharashtra</option><option>Uttar Pradesh</option><option>Tamil Nadu</option><option>Karnataka</option><option>Delhi</option><option>West Bengal</option></select></div></div>'},
    {title:"Verify Your EPIC",desc:"Your Voter ID (EPIC) application is processed. Let's verify your registration status.",content:'<div class="demo-visual"><div style="text-align:center;padding:20px"><div style="font-size:2.5rem;margin-bottom:12px">\u2705</div><h4 style="margin-bottom:8px">Registration Verified!</h4><p style="color:var(--t2);font-size:.88rem">Your details have been verified by the BLO:</p><div style="text-align:left;margin-top:16px;display:grid;gap:8px"><div class="demo-option selected">\u2714 Indian Citizen - Verified</div><div class="demo-option selected">\u2714 Age 18+ - Verified</div><div class="demo-option selected">\u2714 Address Verified by BLO</div><div class="demo-option selected">\u2714 EPIC Card Number: ABC1234567</div></div></div></div>'},
    {title:"Find Your Polling Booth",desc:"Locate your designated polling booth and check timing details.",content:'<div class="demo-visual"><div style="text-align:center;padding:16px"><div style="font-size:2rem;margin-bottom:12px">\u{1F4CD}</div><h4 style="margin-bottom:12px">Your Polling Booth</h4><div style="text-align:left;display:grid;gap:10px"><div class="demo-option selected">\u{1F3EB} Government Primary School, Ward 5</div><div class="demo-option selected">\u{1F555} Voting Hours: 7:00 AM - 6:00 PM</div><div class="demo-option selected">\u{1F4CB} Booth No: 142 | Part No: 12</div><div class="demo-option selected">\u{1F464} Carry: Voter ID / Aadhaar / Passport</div></div></div></div>'},
    {title:"Understand the EVM",desc:"Learn how the Electronic Voting Machine and VVPAT system works.",content:'<div class="demo-visual"><h4 style="margin-bottom:14px;font-size:.95rem">\u{1F5A5} EVM & VVPAT Guide</h4><div class="demo-option"><strong>Ballot Unit (Left Side)</strong><br><span style="color:var(--t2);font-size:.82rem">Shows candidate names, party symbols, and blue buttons</span></div><div class="demo-option"><strong>Control Unit (With Officer)</strong><br><span style="color:var(--t2);font-size:.82rem">Presiding officer activates ballot for each voter</span></div><div class="demo-option"><strong>VVPAT (Attached to EVM)</strong><br><span style="color:var(--t2);font-size:.82rem">Displays printed slip with your vote for 7 seconds</span></div><div class="demo-option"><strong>NOTA Button</strong><br><span style="color:var(--t2);font-size:.82rem">Last button on ballot unit to reject all candidates</span></div></div>'},
    {title:"Cast Your Vote",desc:"It's polling day! Here's the step-by-step voting experience.",content:'<div class="demo-visual" style="text-align:center;padding:24px"><div style="font-size:3rem;margin-bottom:12px">\u{1F5F3}</div><h4 style="margin-bottom:12px">Voting at the Booth</h4><div style="text-align:left;display:grid;gap:10px"><div class="demo-option selected">\u2714 Step 1: Queue up and show your Voter ID</div><div class="demo-option selected">\u2714 Step 2: Indelible ink applied on left index finger</div><div class="demo-option selected">\u2714 Step 3: Officer activates ballot on Control Unit</div><div class="demo-option selected">\u2714 Step 4: Press blue button next to your candidate</div><div class="demo-option selected">\u2714 Step 5: Verify VVPAT slip (7 seconds display)</div><div class="demo-option selected">\u2714 Step 6: Exit — you\'ve voted! \u{1F1EE}\u{1F1F3}</div></div></div>'},
    {title:"Results & Government",desc:"After all phases are done, counting day arrives. Here's a simulated result.",content:'<div class="demo-result"><div class="result-icon">\u{1F4CA}</div><h4>Simulated Lok Sabha Results</h4><p style="color:var(--t2);font-size:.85rem;margin-bottom:16px">Results from our election simulation</p><div style="text-align:left"><p style="font-size:.88rem;margin-bottom:6px"><strong>Alliance A</strong> - 285 seats</p><div class="demo-bar"><div class="demo-bar-fill" style="width:52.5%;background:var(--ac)"></div></div><p style="font-size:.88rem;margin-bottom:6px;margin-top:12px"><strong>Alliance B</strong> - 198 seats</p><div class="demo-bar"><div class="demo-bar-fill" style="width:36.5%;background:var(--cyn)"></div></div><p style="font-size:.88rem;margin-bottom:6px;margin-top:12px"><strong>Others</strong> - 60 seats</p><div class="demo-bar"><div class="demo-bar-fill" style="width:11%;background:var(--amb)"></div></div><p style="text-align:center;margin-top:20px;color:var(--grn);font-weight:600">\u2705 Alliance A forms government with 285/543 seats</p></div></div>'}
  ],

  KB: {
    register:"To register to vote in India:\n\n1. **Online**: Visit voters.eci.gov.in (NVSP portal)\n2. **App**: Use the Voter Helpline app\n3. **Offline**: Submit Form 6 at your local ERO office\n\nYou'll need: Aadhaar card, age proof, address proof, and passport-size photos. BLO (Booth Level Officer) will verify your address. Your EPIC (Voter ID) card will be issued after verification.",
    electoral:"The **Indian Electoral System** uses First-Past-The-Post:\n\n\u2022 **Lok Sabha**: 543 constituencies, each elects 1 MP\n\u2022 **Majority**: 272 seats needed to form government\n\u2022 **ECI**: Autonomous body under Article 324\n\u2022 **Multi-phase**: Elections held in 5-7 phases\n\u2022 **EVMs**: Electronic Voting Machines with VVPAT\n\nThe President invites the majority party/coalition leader to be PM.",
    methods:"How voting works in India:\n\n\u{1F5A5} **EVM Voting**: Press the blue button next to your candidate's symbol on the Electronic Voting Machine\n\u{1F4C4} **VVPAT**: Paper slip shows your vote for 7 seconds for verification\n\u274C **NOTA**: Last button on EVM to reject all candidates\n\u{1F4EC} **Postal Ballot**: Available for service voters, senior citizens (80+), PwD, and essential service workers\n\n Carry your Voter ID to the polling booth!",
    primaries:"India doesn't have a primary system like the US. Instead:\n\n\u{1F3DB} **Party Tickets**: Parties internally decide candidates\n\u{1F4DD} **Nomination**: Candidates file papers with Returning Officer\n\u{1F4B0} **Security Deposit**: \u20B925,000 for Lok Sabha candidates\n\u{1F50D} **Scrutiny**: Papers verified for eligibility\n\u{2696} **Independent**: Anyone can contest as an independent candidate\n\nParties allocate tickets based on winnability, caste equations, and local factors.",
    dates:"**Key Election Information:**\n\n\u{1F4C5} Lok Sabha elections are held every 5 years\n\u23F0 Polling hours: typically 7:00 AM to 6:00 PM\n\u{1F6AB} Campaigning stops 48 hours before polling\n\u{1F4CA} Counting day is usually a single day event\n\u{1FAA5} Carry valid photo ID (EPIC, Aadhaar, Passport)\n\n Check your booth details on the Voter Helpline app!",
    candidate:"To contest **Lok Sabha** elections:\n\u2022 Indian citizen\n\u2022 At least 25 years old\n\u2022 Registered as voter in any constituency\n\u2022 Security deposit: \u20B925,000 (General), \u20B912,500 (SC/ST)\n\n**Rajya Sabha**: 30+ years old\n**State Assembly**: 25+ years old\n\nMust file nomination papers and affidavit declaring criminal cases, assets, and education.",
    results:"How **results** work in India:\n\n1. Polling phases complete over weeks\n2. EVMs stored in secure strongrooms\n3. Counting day: postal ballots first, then EVM rounds\n4. VVPAT cross-verification of 5 random booths per seat\n5. Constituency-wise results declared by Returning Officer\n6. Results updated live on results.eci.gov.in\n7. President invites majority party to form government\n8. PM and ministers sworn in at Rashtrapati Bhavan",
    fallback:"I can help with Indian elections:\n\n\u{1F4DD} **Voter Registration** \u2014 NVSP, Form 6, EPIC card\n\u{1F5F3} **Voting Process** \u2014 EVM, VVPAT, NOTA\n\u{1F4CA} **Election System** \u2014 Multi-phase, Lok Sabha, Rajya Sabha\n\u{1F3DB} **Government Formation** \u2014 272 seats, coalition, PM\n\u{1F4C5} **Key Info** \u2014 Dates, timelines, helpline\n\u{1F3AF} **Candidate Rules** \u2014 Eligibility, nomination\n\u{1F4C8} **Results** \u2014 Counting process, declaration\n\nTry asking about any of these topics!"
  },

  CHIPS: [
    {label:"\u{1F4DD} Registration", q:"How do I register to vote in India?"},
    {label:"\u{1F5F3} EVM Voting", q:"How does EVM voting work?"},
    {label:"\u{1F3DB} Lok Sabha", q:"How does the Lok Sabha election work?"},
    {label:"\u274C NOTA", q:"What is NOTA?"},
    {label:"\u{1F4C5} Key Dates", q:"When are elections held in India?"},
    {label:"\u{1F3AF} Candidate Rules", q:"What are the requirements to contest elections in India?"}
  ],

  heroDesc: "From voter registration to government formation \u2014 explore every step of India's democratic process through interactive timelines, live simulations, and expert guidance."
};

const DATA_IN_STATE = {
  TL: [
    {id:1,label:"Election\nAnnounced",icon:"\u{1F4E2}",title:"State Election Announcement",desc:"The ECI announces the schedule for the Vidhan Sabha (State Assembly) elections. The Model Code of Conduct applies specifically to the state government.",meta:["6-8 weeks before","State MCC"]},
    {id:2,label:"Nomination",icon:"\u{1F4DD}",title:"Candidate Nomination",desc:"Candidates for MLA (Member of Legislative Assembly) file nominations. Regional parties often play a much larger role compared to national elections.",meta:["Regional Focus","MLA Candidates"]},
    {id:3,label:"Scrutiny",icon:"\u{1F50D}",title:"Scrutiny & Withdrawal",desc:"Returning Officers verify papers. Withdrawals are processed to finalize the list of candidates contesting for the Assembly seats.",meta:["Finalizing List","Local Seats"]},
    {id:4,label:"Campaign",icon:"\u{1F4E3}",title:"State Campaigning",desc:"Campaigns focus heavily on state-specific issues: local infrastructure, agriculture, state taxes, and language/cultural identity.",meta:["State Issues","Rallies & Raths"]},
    {id:5,label:"Polling\nDay",icon:"\u{1F5F3}",title:"Vidhan Sabha Polling",desc:"Voters cast their ballots using EVMs to elect their local MLA. Elections may be held in a single phase for smaller states, or multiple phases for larger ones.",meta:["Electing MLAs","EVM Voting"]},
    {id:6,label:"Results",icon:"\u{1F4CA}",title:"Vote Counting",desc:"Votes are counted simultaneously across the state. The party or alliance winning a majority of seats in the Vidhan Sabha wins the mandate.",meta:["Counting Day","Majority Needed"]},
    {id:7,label:"CM Selection",icon:"\u{1F464}",title:"Choosing the Chief Minister",desc:"The newly elected MLAs of the majority party meet to formally elect their legislative party leader, who will become the Chief Minister.",meta:["Legislative Meeting","Leader Chosen"]},
    {id:8,label:"Government\nFormation",icon:"\u{1F3DB}",title:"State Government Formation",desc:"The Governor of the state invites the leader of the majority party/coalition to take the oath as Chief Minister and form the state cabinet.",meta:["Oath by Governor","State Cabinet"]}
  ],
  OV: [
    {icon:"\u{1F3DB}",title:"Vidhan Sabha",desc:"Electing Members of the Legislative Assembly (MLAs) who make state laws."},
    {icon:"\u{1F464}",title:"Chief Minister",desc:"The head of the state government, chosen by the majority party in the Assembly."},
    {icon:"\u{1F3E2}",title:"State Issues",desc:"Elections driven by local infrastructure, state taxes, agriculture, and law & order."},
    {icon:"\u{1F91D}",title:"Regional Parties",desc:"Regional and state-level political parties often dominate Vidhan Sabha elections."}
  ],
  PH: [
    {tab:"Candidates",icon:"\u{1F4E5}",title:"MLA Nominations",sub:"The local representatives",steps:[{t:"Eligibility",d:"Must be an Indian citizen and at least 25 years old to contest an Assembly seat."},{t:"The Role of an MLA",d:"MLAs represent their local constituency in the Vidhan Sabha and vote on state legislation."}]},
    {tab:"Campaigns",icon:"\u{1F4E3}",title:"State Campaigns",sub:"Focusing on the grassroots",steps:[{t:"Local Manifestos",d:"Parties release state-specific manifestos promising local development and welfare schemes."},{t:"Language & Culture",d:"Campaigns are often conducted heavily in the local or regional language."}]},
    {tab:"Polling",icon:"\u{1F5F3}",title:"State Voting Process",sub:"Using the EVM for local seats",steps:[{t:"Same Process, Different Ballot",d:"The voting process is identical to Lok Sabha elections, but the EVM lists local MLA candidates."},{t:"Security",d:"State police and CAPF are deployed to ensure peaceful polling."}]},
    {tab:"Government",icon:"\u{1F3DB}",title:"Forming the State Govt",sub:"From MLAs to the Chief Minister",steps:[{t:"Majority Rule",d:"A party needs more than 50% of the Assembly seats to form the government."},{t:"The Governor's Role",d:"The Governor (appointed by the President) formally invites the majority leader to become Chief Minister."}]}
  ],
  CK: [
    {t:"Know Your Assembly Constituency",d:"Identify your specific Vidhan Sabha constituency, which is smaller than a Lok Sabha one."},
    {t:"Research MLA Candidates",d:"Review the track record and affidavits of the candidates running for MLA."},
    {t:"Check State Manifestos",d:"Read what parties are promising for state-level development."},
    {t:"Verify Booth Location",d:"Ensure your polling booth hasn't changed since the last election."}
  ],
  FAQ: [
    {q:"What is the difference between Lok Sabha and Vidhan Sabha?",a:"Lok Sabha (National) elects MPs who choose the Prime Minister. Vidhan Sabha (State) elects MLAs who choose the Chief Minister of the state.",c:"process"},
    {q:"How is a Chief Minister selected?",a:"Voters elect MLAs. The party or coalition with a majority of MLAs selects a leader, who is then appointed Chief Minister by the State Governor.",c:"results"},
    {q:"What issues are decided at the state level?",a:"States handle law and order (police), public health, state highways, agriculture, and local education policies.",c:"process"},
    {q:"Can I vote in a different state's election?",a:"No. You can only vote in the state where you are ordinarily resident and registered on the electoral roll.",c:"voting"},
    {q:"Do state elections happen at the same time as national elections?",a:"Sometimes (Simultaneous Elections), but usually they occur on their own 5-year cycle, separate from the Lok Sabha.",c:"dates"}
  ],
  DEMO: [
    {title:"Review State Candidates",desc:"In state elections, you are voting for a Member of Legislative Assembly (MLA).",content:'<div class="demo-visual"><h4 style="margin-bottom:14px;font-size:.95rem">\u{1F4CB} Vidhan Sabha Ballot Preview</h4><div class="demo-option"><strong>Candidate A</strong><br><span style="color:var(--t2);font-size:.82rem">Regional Party 1 (Symbol: Bicycle)</span></div><div class="demo-option"><strong>Candidate B</strong><br><span style="color:var(--t2);font-size:.82rem">National Party 1 (Symbol: Lotus)</span></div><div class="demo-option"><strong>Candidate C</strong><br><span style="color:var(--t2);font-size:.82rem">National Party 2 (Symbol: Hand)</span></div></div>'},
    {title:"Simulate Assembly Results",desc:"The party with the majority of MLAs forms the state government.",content:'<div class="demo-result"><div class="result-icon">\u{1F4CA}</div><h4>Simulated Assembly Results</h4><p style="color:var(--t2);font-size:.85rem;margin-bottom:16px">State Assembly (200 Seats Total)</p><div style="text-align:left"><p style="font-size:.88rem;margin-bottom:6px"><strong>Regional Party 1</strong> - 115 seats</p><div class="demo-bar"><div class="demo-bar-fill" style="width:57.5%;background:var(--ac)"></div></div><p style="font-size:.88rem;margin-bottom:6px;margin-top:12px"><strong>National Party 1</strong> - 70 seats</p><div class="demo-bar"><div class="demo-bar-fill" style="width:35%;background:var(--cyn)"></div></div><p style="text-align:center;margin-top:20px;color:var(--grn);font-weight:600">\u2705 Regional Party 1 forms the government.</p></div></div>'}
  ],
  KB: {
    register:"Registration rules are exactly the same as national elections. Ensure you are registered in the specific constituency where you reside.",
    electoral:"State Assembly (Vidhan Sabha) elections use First-Past-The-Post. You elect an MLA. The party with the majority of MLAs forms the government.",
    methods:"EVM voting is identical to national elections. You will see candidate names, their party symbols, and the NOTA option.",
    primaries:"Candidates (MLAs) are selected by party leadership based on local influence, caste arithmetic, and winnability. There are no US-style primaries.",
    dates:"State elections occur every 5 years, but the cycle depends on the specific state. They are often held at different times than the Lok Sabha elections.",
    candidate:"To be an MLA, you must be a citizen, at least 25 years old, and a registered voter. You must file an affidavit declaring criminal records and assets.",
    results:"Votes are counted by the ECI. If a party wins a majority (e.g., 101 out of 200 seats), the Governor invites their leader to be Chief Minister.",
    fallback:"I can answer questions about State Assembly (Vidhan Sabha) elections, MLAs, Chief Ministers, and how state governments are formed!"
  },
  CHIPS: [
    {label:"\u{1F3DB} Vidhan Sabha", q:"What is the Vidhan Sabha?"},
    {label:"\u{1F464} Chief Minister", q:"How is the Chief Minister selected?"},
    {label:"\u{1F4E5} MLA Candidates", q:"What are the rules to become an MLA?"},
    {label:"\u{1F3E2} State vs National", q:"What is the difference between Lok Sabha and Vidhan Sabha?"}
  ],
  heroDesc: "Dive into state politics \u2014 explore how Chief Ministers are chosen and how local assemblies impact governance and daily life in India."
};

const DATA_IN = {
  federal: DATA_IN_FEDERAL,
  state: DATA_IN_STATE
};

// For backward compatibility during migration
window.DATA_IN = DATA_IN;
