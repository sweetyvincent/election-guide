// US Election Data
"use strict";

const DATA_US_FEDERAL = {
  TL: [
    {id:1,label:"Announce\nCandidacy",icon:"\u{1F4E2}",title:"Candidacy Announcement",desc:"Candidates formally declare their intention to run for office. They file paperwork with the FEC, form campaign committees, and begin fundraising. This phase often starts 1-2 years before election day for presidential races.",meta:["12-24 months before","FEC Filing Required"]},
    {id:2,label:"Primary\nCampaign",icon:"\u{1F4E3}",title:"Primary Campaign Season",desc:"Candidates campaign across states, participate in debates, attend rallies, and build grassroots support. Media coverage intensifies as voters evaluate each candidate's platform and policies.",meta:["6-18 months before","Debates & Rallies"]},
    {id:3,label:"Primaries &\nCaucuses",icon:"\u{1F5F3}",title:"Primaries & Caucuses",desc:"State-level elections where party members vote for their preferred candidate. Primaries use secret ballots; caucuses involve public gatherings and discussions. Delegates are awarded based on results.",meta:["Jan - June of election year","State by State"]},
    {id:4,label:"National\nConventions",icon:"\u{1F3DB}",title:"National Conventions",desc:"Each major party holds a multi-day convention to officially nominate their candidate. Delegates cast votes, the party platform is adopted, and the VP pick is announced.",meta:["July - August","Delegate Votes"]},
    {id:5,label:"General\nCampaign",icon:"\u{1F399}",title:"General Election Campaign",desc:"The nominated candidates campaign head-to-head. Presidential debates are held, advertising intensifies, and candidates focus on swing states.",meta:["Sept - November","Presidential Debates"]},
    {id:6,label:"Election\nDay",icon:"\u{1F1FA}\u{1F1F8}",title:"Election Day",desc:"Voters cast ballots at polling places or through mail-in/absentee voting. Results begin coming in as polls close across time zones.",meta:["First Tues after Nov 1","Polls Open Nationwide"]},
    {id:7,label:"Electoral\nCollege",icon:"\u{2696}",title:"Electoral College Vote",desc:"Electors in each state cast votes based on popular vote results. A candidate needs 270 out of 538 electoral votes to win. Congress certifies results in January.",meta:["December","270 Votes to Win"]},
    {id:8,label:"Inauguration",icon:"\u{1F389}",title:"Inauguration Day",desc:"The President-elect is sworn into office on January 20th at the U.S. Capitol, followed by an inaugural address and peaceful transfer of power.",meta:["January 20","Transfer of Power"]}
  ],
  OV: [
    {icon:"\u{1F4CB}",title:"Voter Registration",desc:"The first step to participating. Register through your state's website, by mail, or in person."},
    {icon:"\u{1F4CA}",title:"Primary Elections",desc:"Each party narrows the field. Voters select their preferred candidate through primaries or caucuses."},
    {icon:"\u{1F3DB}",title:"National Conventions",desc:"Parties officially nominate candidates and adopt platforms at national conventions."},
    {icon:"\u{1F5F3}",title:"General Election",desc:"The final contest. Voters choose between party nominees on election day."},
    {icon:"\u{2696}",title:"Electoral College",desc:"538 electors formally elect the President. 270 votes needed to win."},
    {icon:"\u{1F389}",title:"Inauguration",desc:"The President-elect takes the oath of office on January 20th."}
  ],
  PH: [
    {tab:"Registration",icon:"\u{1F4DD}",title:"Voter Registration",sub:"The foundation of democratic participation",steps:[{t:"Check Eligibility",d:"Must be a U.S. citizen, meet state residency requirements, and be 18+ by election day."},{t:"Choose Registration Method",d:"Register online, by mail using the National Voter Registration Form, or in person at your local election office/DMV."},{t:"Provide Required Info",d:"Full legal name, address, date of birth, and state ID or last four SSN digits."},{t:"Submit Before Deadline",d:"Most states require registration 15-30 days before election. Some offer same-day registration."}]},
    {tab:"Campaigning",icon:"\u{1F4E3}",title:"Campaign Season",sub:"How candidates make their case",steps:[{t:"Building a Team",d:"Campaign manager, communications director, policy advisors, and field organizers across key states."},{t:"Fundraising",d:"Individual donations, events, PACs, and online contributions. FEC regulates limits."},{t:"Debates & Forums",d:"Organized debates where candidates present positions and challenge opponents on policy."},{t:"Voter Outreach",d:"Canvassing, phone banking, digital ads, rallies, and town halls to reach voters."}]},
    {tab:"Primaries",icon:"\u{1F5F3}",title:"Primaries & Caucuses",sub:"Narrowing the field within each party",steps:[{t:"Open vs Closed",d:"Closed: only registered party members vote. Open: any registered voter can participate."},{t:"Caucus Process",d:"Local gatherings where voters publicly show support with multiple rounds possible."},{t:"Delegate Allocation",d:"Democrats use proportional; Republicans vary by state (winner-take-all or proportional)."},{t:"Super Tuesday",d:"Biggest primary day with 10+ states voting simultaneously. Can make or break campaigns."}]},
    {tab:"Conventions",icon:"\u{1F3DB}",title:"National Conventions",sub:"Officially nominating party candidates",steps:[{t:"Delegate Roll Call",d:"State delegations announce counts. Majority threshold wins nomination."},{t:"VP Selection",d:"Nominee selects running mate to balance the ticket and energize the base."},{t:"Platform Adoption",d:"Official platform outlining positions on economy, healthcare, education, foreign policy."},{t:"Acceptance Speech",d:"Keynote speech to rally the party and kick off the general election."}]},
    {tab:"General",icon:"\u{1F399}",title:"General Election",sub:"The final contest for presidency",steps:[{t:"Swing State Strategy",d:"Resources concentrated in battleground states where outcomes are uncertain."},{t:"Presidential Debates",d:"Three presidential + one VP debate. Commission sets rules and format."},{t:"Early & Absentee Voting",d:"Many states allow voting before election day through early in-person or mail-in ballots."},{t:"GOTV Operations",d:"Massive final push - calling voters, rides to polls, data-driven targeting."}]},
    {tab:"Results",icon:"\u{1F4CA}",title:"Counting & Results",sub:"From votes to certified outcomes",steps:[{t:"Vote Counting",d:"Officials count using optical scanners, hand counts, or electronic systems."},{t:"Media Projections",d:"Networks use exit polls and partial results to project winners on election night."},{t:"Canvassing & Certification",d:"Results audited and verified by county/state boards over days to weeks."},{t:"Recounts & Challenges",d:"Close margins trigger automatic recounts. Candidates can file legal challenges."}]}
  ],
  CK: [
    {t:"Check Registration Status",d:"Verify you're registered at your current address."},
    {t:"Know Your Polling Place",d:"Find location, hours, and accessibility info."},
    {t:"Review the Ballot",d:"Research candidates and ballot measures beforehand."},
    {t:"Bring Valid ID",d:"Check state ID requirements and prepare documents."},
    {t:"Plan Your Vote",d:"Decide: in person, early, or by mail."},
    {t:"Request Absentee Ballot",d:"If voting by mail, request and return on time."},
    {t:"Know Key Deadlines",d:"Registration, early voting, and ballot return dates."},
    {t:"Spread the Word",d:"Encourage family and friends to participate."}
  ],
  FAQ: [
    {q:"How do I register to vote?",a:"Register online at your state's election website or vote.gov, by mail using the National Voter Registration Form, or in person at your local election office or DMV.",c:"registration"},
    {q:"What do I need to bring to vote?",a:"Requirements vary by state. Many require photo ID. Some accept non-photo ID or affidavits. Check your state's specific requirements.",c:"voting"},
    {q:"What is the Electoral College?",a:"538 electors who formally elect the President. Each state gets electors equal to its Congressional representation. 270 needed to win. Most states use winner-take-all.",c:"process"},
    {q:"When are results official?",a:"Election night results are projections. Official results are certified over following weeks. Electoral College votes in December, Congress certifies in January.",c:"results"},
    {q:"Can I vote if I moved recently?",a:"Update your registration to your new address. Within same state: update online. New state: register there. Some states offer same-day registration.",c:"registration"},
    {q:"What is early voting?",a:"Casting your ballot in person before election day. Dates vary by state, typically 10-45 days before. Reduces crowds and gives flexibility.",c:"voting"},
    {q:"How do primaries and caucuses differ?",a:"Primaries: state-run elections with secret ballots. Caucuses: party-organized meetings with public discussion and support, sometimes multiple rounds.",c:"process"},
    {q:"What if no one gets 270 electoral votes?",a:"The House elects the President (one vote per state delegation) and Senate elects the VP. Happened once in 1824.",c:"results"},
    {q:"Can I vote by mail?",a:"All states offer some form. Some conduct elections entirely by mail. Others require an excuse. Check your state's rules and deadlines.",c:"voting"},
    {q:"What are swing states?",a:"States where neither party has a clear advantage. Both candidates campaign heavily as these electoral votes could decide the election.",c:"process"}
  ],
  DEMO: [
    {title:"Register to Vote",desc:"First, let's get you registered. Fill in your basic information to begin the registration process.",content:'<div class="demo-visual"><div class="demo-form-group"><label for="demo-name">Full Legal Name</label><input type="text" placeholder="e.g. Jane Smith" id="demo-name"></div><div class="demo-form-group"><label for="demo-dob">Date of Birth</label><input type="date" id="demo-dob"></div><div class="demo-form-group"><label for="demo-state">State of Residence</label><select id="demo-state"><option>Select your state...</option><option>California</option><option>Texas</option><option>Florida</option><option>New York</option><option>Pennsylvania</option><option>Ohio</option></select></div></div>'},
    {title:"Verify Eligibility",desc:"We'll check your eligibility based on the information provided.",content:'<div class="demo-visual"><div style="text-align:center;padding:20px"><div style="font-size:2.5rem;margin-bottom:12px">\u2705</div><h4 style="margin-bottom:8px">Eligibility Confirmed!</h4><p style="color:var(--t2);font-size:.88rem">Based on your information, you meet all requirements:</p><div style="text-align:left;margin-top:16px;display:grid;gap:8px"><div class="demo-option selected">\u2714 U.S. Citizen - Verified</div><div class="demo-option selected">\u2714 Age 18+ - Verified</div><div class="demo-option selected">\u2714 State Residency - Verified</div></div></div></div>'},
    {title:"Choose Voting Method",desc:"Select how you\'d like to cast your vote.",content:'<div class="demo-visual"><div class="demo-option" onclick="this.classList.toggle(\'selected\')">\u{1F3DB} <strong>In-Person on Election Day</strong><br><span style="color:var(--t2);font-size:.82rem">Vote at your assigned polling place on election day</span></div><div class="demo-option" onclick="this.classList.toggle(\'selected\')">\u{1F4C5} <strong>Early In-Person Voting</strong><br><span style="color:var(--t2);font-size:.82rem">Vote before election day at designated locations</span></div><div class="demo-option" onclick="this.classList.toggle(\'selected\')">\u{1F4EC} <strong>Mail-In / Absentee Ballot</strong><br><span style="color:var(--t2);font-size:.82rem">Request a ballot and vote from home</span></div></div>'},
    {title:"Review Your Ballot",desc:"Before voting, review the candidates and ballot measures.",content:'<div class="demo-visual"><h4 style="margin-bottom:14px;font-size:.95rem">\u{1F4CB} Sample Ballot Preview</h4><div class="demo-option"><strong>President</strong><br><span style="color:var(--t2);font-size:.82rem">Candidate A (Party 1) vs Candidate B (Party 2)</span></div><div class="demo-option"><strong>U.S. Senate</strong><br><span style="color:var(--t2);font-size:.82rem">Candidate C vs Candidate D</span></div><div class="demo-option"><strong>Proposition 1</strong><br><span style="color:var(--t2);font-size:.82rem">Infrastructure funding measure - Yes/No</span></div><div class="demo-option"><strong>Local Judge</strong><br><span style="color:var(--t2);font-size:.82rem">Retain Judge Smith? - Yes/No</span></div></div>'},
    {title:"Cast Your Vote",desc:"It's election day! Here's what the voting process looks like.",content:'<div class="demo-visual" style="text-align:center;padding:24px"><div style="font-size:3rem;margin-bottom:12px">\u{1F5F3}</div><h4 style="margin-bottom:12px">Casting Your Ballot</h4><div style="text-align:left;display:grid;gap:10px"><div class="demo-option selected">\u2714 Step 1: Check in with poll workers</div><div class="demo-option selected">\u2714 Step 2: Receive your ballot</div><div class="demo-option selected">\u2714 Step 3: Mark your choices privately</div><div class="demo-option selected">\u2714 Step 4: Submit your ballot</div><div class="demo-option selected">\u2714 Step 5: Get your I Voted sticker!</div></div></div>'},
    {title:"See the Results",desc:"After polls close, votes are counted and results come in.",content:'<div class="demo-result"><div class="result-icon">\u{1F4CA}</div><h4>Simulated Election Results</h4><p style="color:var(--t2);font-size:.85rem;margin-bottom:16px">Results based on our simulation</p><div style="text-align:left"><p style="font-size:.88rem;margin-bottom:6px"><strong>Candidate A</strong> - 52.3%</p><div class="demo-bar"><div class="demo-bar-fill" style="width:52.3%;background:var(--ac)"></div></div><p style="font-size:.88rem;margin-bottom:6px;margin-top:12px"><strong>Candidate B</strong> - 47.7%</p><div class="demo-bar"><div class="demo-bar-fill" style="width:47.7%;background:var(--cyn)"></div></div><p style="text-align:center;margin-top:20px;color:var(--grn);font-weight:600">\u2705 Candidate A wins with 306 Electoral Votes</p></div></div>'}
  ],
  KB: {
    register:"To register to vote:\n\n1. **Online**: Visit your state's election website or vote.gov\n2. **By Mail**: Download the National Voter Registration Form\n3. **In Person**: Visit your local election office or DMV\n\nYou'll need: full legal name, address, date of birth, and state ID or last 4 SSN digits. Most states require registration 15-30 days before the election.",
    electoral:"The **Electoral College** has 538 electors:\n\n\u2022 Each state gets electors equal to Senators (2) + Representatives\n\u2022 DC gets 3 electors (23rd Amendment)\n\u2022 Need **270 electoral votes** to win\n\u2022 Most states use **winner-take-all**\n\u2022 Maine and Nebraska use congressional district method\n\nElectors meet in December to cast official votes.",
    methods:"Ways to cast your vote:\n\n\u{1F3DB} **In-Person**: Go to your assigned polling place on election day\n\u{1F4EC} **Mail-In/Absentee**: Request a ballot by mail and return before deadline\n\u{1F4C5} **Early Voting**: Vote in person before election day (10-45 days before)\n\n Check your state's options at vote.gov!",
    primaries:"**Primaries**: State-run elections with secret ballots\n\u2022 Open: any voter can participate\n\u2022 Closed: only registered party members\n\n**Caucuses**: Party-organized local meetings\n\u2022 Public discussion and support\n\u2022 Multiple rounds possible\n\n**Super Tuesday**: Biggest primary day with 10+ states voting simultaneously.",
    dates:"**Key Election Dates:**\n\n\u{1F4C5} For 2028: Election Day is **November 7, 2028**\n\u23F0 Polls typically open 6-7 AM, close 7-8 PM\n\u{1F4CD} Vote at your assigned polling place\n\u{1FAA5} Bring required identification\n\nExpect: check in, receive ballot, mark choices, submit, get your sticker!",
    candidate:"To run for **President**:\n\u2022 Natural-born U.S. citizen\n\u2022 At least 35 years old\n\u2022 U.S. resident for 14+ years\n\n**Senate**: citizen 9+ years, 30+ years old\n**House**: citizen 7+ years, 25+ years old\n\nMust file with FEC and comply with campaign finance laws.",
    results:"How **results** are determined:\n\n1. Election Night: Media projects winners (unofficial)\n2. Vote Counting: Days/weeks for all ballots\n3. Canvassing: County boards audit results\n4. Certification: State officials certify\n5. Electoral College: Electors vote in December\n6. Congressional Certification: January 6\n7. Inauguration: January 20",
    fallback:"I can help with:\n\n\u{1F4DD} **Voter Registration** \u2014 How to register\n\u{1F5F3} **Voting Methods** \u2014 In-person, mail-in, early\n\u{1F4CA} **Primaries & Caucuses** \u2014 How parties choose nominees\n\u{1F3DB} **Electoral College** \u2014 How the system works\n\u{1F4C5} **Key Dates** \u2014 Important timeline dates\n\u{1F3AF} **Candidate Requirements** \u2014 Who can run\n\u{1F4C8} **Results** \u2014 How votes are counted\n\nTry asking about any of these topics!"
  },
  CHIPS: [
    {label:"\u{1F4DD} Registration", q:"How do I register to vote?"},
    {label:"\u{1F5F3} Voting Methods", q:"What are the different ways to vote?"},
    {label:"\u{1F3DB} Electoral College", q:"How does the Electoral College work?"},
    {label:"\u{1F4CA} Primaries", q:"What are primaries and caucuses?"},
    {label:"\u{1F4C5} Key Dates", q:"When is election day and what are key dates?"},
    {label:"\u{1F3AF} Candidate Requirements", q:"What are the requirements to run for president?"}
  ],
  heroDesc: "From voter registration to inauguration \u2014 explore every step of the federal democratic process through interactive timelines, live simulations, and expert guidance."
};

const DATA_US_STATE = {
  TL: [
    {id:1,label:"Announce\nCandidacy",icon:"\u{1F4E2}",title:"Candidacy Announcement",desc:"Candidates for Governor, State Legislature, or other state-wide offices announce their campaigns and file paperwork with the Secretary of State.",meta:["Up to 1 year before","State Filing"]},
    {id:2,label:"Primary\nCampaign",icon:"\u{1F4E3}",title:"State Primary Campaign",desc:"Candidates focus heavily on local issues. Debates are often regionally televised or held at town halls across the state.",meta:["Months before primary","Local Issues"]},
    {id:3,label:"State\nPrimaries",icon:"\u{1F5F3}",title:"State Primaries",desc:"Voters select party nominees for state offices. The timing of state primaries may differ from presidential primaries.",meta:["Varies by State","Party Nominees"]},
    {id:4,label:"General\nCampaign",icon:"\u{1F399}",title:"General Campaign",desc:"The nominees for state offices campaign head-to-head. Focus is on state budget, education, infrastructure, and local economy.",meta:["Late Summer - Fall","Town Halls"]},
    {id:5,label:"Election\nDay",icon:"\u{1F1FA}\u{1F1F8}",title:"Election Day",desc:"Voters cast ballots for state-level positions. This is often held on the same day as federal elections, but some states hold off-year elections.",meta:["November","Direct Election"]},
    {id:6,label:"Results &\nCertification",icon:"\u{1F4CA}",title:"Certification of Results",desc:"State election boards verify and certify the results. Unlike the presidency, Governors are elected by direct popular vote.",meta:["Late Nov - Dec","Popular Vote"]},
    {id:7,label:"Inauguration",icon:"\u{1F389}",title:"State Inauguration",desc:"The newly elected Governor and other state officials are sworn into office at the State Capitol.",meta:["January","State Capitol"]}
  ],
  OV: [
    {icon:"\u{1F3DB}",title:"Gubernatorial Races",desc:"Electing the chief executive of the state, the Governor."},
    {icon:"\u{1F4CA}",title:"State Legislature",desc:"Voting for representatives in the State House and State Senate."},
    {icon:"\u{2696}",title:"State Supreme Court",desc:"In many states, voters elect or retain state supreme court justices."},
    {icon:"\u{1F4CB}",title:"Ballot Measures",desc:"Voters decide directly on propositions, amendments, or referendums."}
  ],
  PH: [
    {tab:"Registration",icon:"\u{1F4DD}",title:"Voter Registration",sub:"Your state sets the rules",steps:[{t:"State Requirements",d:"Each state has different rules for ID requirements, felony disenfranchisement, and registration deadlines."},{t:"Same-Day Registration",d:"Many states allow you to register at the polls on Election Day for state and local elections."}]},
    {tab:"Candidates",icon:"\u{1F4E3}",title:"Who is on the Ballot?",sub:"State-level offices",steps:[{t:"The Executive",d:"Governor, Lieutenant Governor, Attorney General, and Secretary of State."},{t:"The Legislature",d:"State Senators and State Representatives who make state laws and pass budgets."},{t:"The Judiciary",d:"Many states elect local judges and state supreme court justices."}]},
    {tab:"Issues",icon:"\u{1F4CB}",title:"State Issues & Measures",sub:"Direct democracy at work",steps:[{t:"Referendums",d:"Citizens can vote to approve or reject laws passed by the state legislature."},{t:"Initiatives",d:"Citizens can bypass the legislature and place proposed statutes or amendments directly on the ballot."}]},
    {tab:"Voting",icon:"\u{1F5F3}",title:"Casting Your Vote",sub:"How your state manages the polls",steps:[{t:"Voting Equipment",d:"States choose their own voting technology, such as optical scanners or DRE machines."},{t:"Mail-In Rules",d:"Some states automatically mail ballots to all voters; others require an excuse for absentee voting."}]},
    {tab:"Results",icon:"\u{1F4CA}",title:"Counting & Certification",sub:"Determining the winners",steps:[{t:"Direct Popular Vote",d:"Unlike the President, Governors and state officials are elected by a direct popular vote."},{t:"State Certification",d:"The Secretary of State or State Board of Elections officially certifies the final results."}]}
  ],
  CK: [
    {t:"Check State Voter ID Rules",d:"Ensure you have the specific identification required by your state."},
    {t:"Research Local Candidates",d:"Look into the candidates running for State Assembly or Senate."},
    {t:"Read Up on Ballot Measures",d:"Understand the propositions and how they will affect your state."},
    {t:"Check Early Voting Dates",d:"State early voting periods can vary significantly."},
    {t:"Find Your Polling Place",d:"Polling locations can change between elections."}
  ],
  FAQ: [
    {q:"What does a Governor do?",a:"The Governor is the chief executive of a state, responsible for implementing state laws, overseeing the executive branch, and proposing the state budget.",c:"process"},
    {q:"How often are Gubernatorial elections?",a:"Most states elect their Governor every four years. Two states (New Hampshire and Vermont) hold elections every two years.",c:"dates"},
    {q:"What are ballot measures?",a:"Ballot measures are proposed laws, constitutional amendments, or referendums that voters decide on directly, rather than through the legislature.",c:"voting"},
    {q:"Are state elections always on the same day as federal elections?",a:"Usually, yes (even years). However, some states (like Virginia, New Jersey, Kentucky, Mississippi, Louisiana) hold 'off-year' elections in odd-numbered years.",c:"dates"},
    {q:"How is a Governor elected?",a:"By direct popular vote of the citizens of that state. There is no Electoral College for state elections.",c:"results"}
  ],
  DEMO: [
    {title:"Review State Ballot",desc:"A state ballot often includes many local offices and measures.",content:'<div class="demo-visual"><h4 style="margin-bottom:14px;font-size:.95rem">\u{1F4CB} State Ballot Preview</h4><div class="demo-option"><strong>Governor</strong><br><span style="color:var(--t2);font-size:.82rem">Candidate A vs Candidate B</span></div><div class="demo-option"><strong>State Senator - District 12</strong><br><span style="color:var(--t2);font-size:.82rem">Candidate C vs Candidate D</span></div><div class="demo-option"><strong>Attorney General</strong><br><span style="color:var(--t2);font-size:.82rem">Candidate E vs Candidate F</span></div><div class="demo-option"><strong>Proposition 104</strong><br><span style="color:var(--t2);font-size:.82rem">Increase education funding - Yes/No</span></div></div>'},
    {title:"Simulate State Results",desc:"Governors are elected by direct popular vote.",content:'<div class="demo-result"><div class="result-icon">\u{1F4CA}</div><h4>Simulated Gubernatorial Results</h4><p style="color:var(--t2);font-size:.85rem;margin-bottom:16px">Results based on popular vote</p><div style="text-align:left"><p style="font-size:.88rem;margin-bottom:6px"><strong>Candidate A</strong> - 55.1%</p><div class="demo-bar"><div class="demo-bar-fill" style="width:55.1%;background:var(--ac)"></div></div><p style="font-size:.88rem;margin-bottom:6px;margin-top:12px"><strong>Candidate B</strong> - 44.9%</p><div class="demo-bar"><div class="demo-bar-fill" style="width:44.9%;background:var(--cyn)"></div></div><p style="text-align:center;margin-top:20px;color:var(--grn);font-weight:600">\u2705 Candidate A is elected Governor</p></div></div>'}
  ],
  KB: {
    register:"Registration for state elections is the same as federal. Register online, by mail, or at the DMV. Check your state's specific ID requirements and deadlines.",
    electoral:"There is NO Electoral College in state elections. Governors, State Senators, and State Representatives are elected by **direct popular vote**.",
    methods:"Voting methods are determined by the state. You may vote in person, early, or by mail depending on the laws of your specific state.",
    primaries:"State primaries decide the candidates for state offices. The timing and rules (open vs. closed) vary widely by state.",
    dates:"State elections usually align with federal elections (November of even years). However, some states hold 'off-year' elections in odd-numbered years.",
    candidate:"Requirements for Governor vary by state, but generally require you to be a US citizen, a resident of the state for a certain number of years, and at least 30 years old.",
    results:"State election results are based on the direct popular vote. The Secretary of State or State Board of Elections certifies the final count.",
    fallback:"I can help with state elections! Ask about Gubernatorial races, State Legislatures, ballot measures, or how state voting rules work."
  },
  CHIPS: [
    {label:"\u{1F3DB} Governor", q:"What does a Governor do?"},
    {label:"\u{1F4CA} State Legislature", q:"What is the State Legislature?"},
    {label:"\u{1F4CB} Ballot Measures", q:"What are ballot measures?"},
    {label:"\u{1F4C5} Off-Year Elections", q:"Are state elections held on different days?"}
  ],
  heroDesc: "Dive into local politics \u2014 explore how Governors, State Legislatures, and local ballot measures shape the future of your state."
};

const DATA_US = {
  federal: DATA_US_FEDERAL,
  state: DATA_US_STATE
};

// For backward compatibility during migration
window.DATA_US = DATA_US;
