-- ============================================================================
-- Refa Learn — English translation of the Session Agreement
--
-- Visitors can switch the site to English (the ID | EN toggle). The
-- agreement stays an Indonesian contract — UU 24/2009 Pasal 31 and PP 71/2019
-- Pasal 46 — and Pasal 18 ayat (1) already says the Indonesian version
-- prevails over a translation. `content_en` holds that translation, shown to
-- English visitors next to a note; acceptances still point at the same
-- contract row, so nothing about what was signed changes.
--
-- New versions are written in both languages in /admin/contracts. Version 2
-- (in force since 2026-10-08) gets its translation below.
-- ============================================================================

alter table public.contracts
  add column if not exists content_en text;

update public.contracts
set content_en = $en$<h2>PRIVATE ENGLISH TUTORING SERVICE AGREEMENT</h2>
<p><strong>REFA LEARN — Tarakan, North Kalimantan</strong></p>

<p>This Agreement is made and accepted electronically through the Refa Learn website on the date and time (WITA) recorded automatically by the system when acceptance is given, by and between:</p>
<ol>
<li><strong>Rega Rizkan Azizan</strong>, owner and operator of the sole-proprietorship tutoring business <strong>Refa Learn</strong>, domiciled in Tarakan City, North Kalimantan Province; hereinafter <strong>"Refa Learn"</strong> or the <strong>"Tutor"</strong>; and</li>
<li><strong>The owner of the student account</strong> whose name, phone number and email address are recorded on the account used to accept this Agreement; hereinafter the <strong>"Student"</strong>. Where the Student is not yet of legal age, the Student is represented by their <strong>parent or guardian</strong> whose name is typed at acceptance, hereinafter the <strong>"Parent/Guardian"</strong>.</li>
</ol>
<p>Refa Learn and the Student (together with the Parent/Guardian, if any) are jointly referred to as the <strong>"Parties"</strong>.</p>

<h3>Legal Basis</h3>
<p>This Agreement is made with regard to:</p>
<ol>
<li>the Indonesian Civil Code, in particular Articles 1313, 1320, 1330, 1338 and 1243–1245;</li>
<li>Law No. 11 of 2008 on Electronic Information and Transactions, as last amended by Law No. 1 of 2024, and Government Regulation No. 71 of 2019 on Electronic Systems and Transactions;</li>
<li>Law No. 8 of 1999 on Consumer Protection;</li>
<li>Law No. 27 of 2022 on Personal Data Protection;</li>
<li>Law No. 28 of 2014 on Copyright;</li>
<li>Law No. 23 of 2002 on Child Protection, as amended by Law No. 35 of 2014;</li>
<li>Law No. 24 of 2009 on the National Flag, Language, Emblem and Anthem; and</li>
<li>Law No. 20 of 2003 on the National Education System, which classifies courses and tutoring as non-formal education.</li>
</ol>

<h3>Article 1 — Definitions</h3>
<ol>
<li>A <strong>Session</strong> is one private one-to-one lesson lasting 90 minutes.</li>
<li>A <strong>Weekly Series</strong> is several Sessions on the same day and time over consecutive weeks, booked in a single booking.</li>
<li>The <strong>Site</strong> is the Refa Learn website together with the Student's account dashboard.</li>
<li>The <strong>Monthly Invoice</strong> is the invoice for all Sessions marked "completed" that have not been invoiced before, plus any unpaid cancellation fees.</li>
<li>All dates and times in this Agreement and on the Site are in <strong>Central Indonesia Time (WITA)</strong>.</li>
</ol>

<h3>Article 2 — Scope of Service</h3>
<ol>
<li>Refa Learn provides private English tutoring (including IELTS and TOEFL preparation, school and university material, and general communication) tailored to the Student's level and goals.</li>
<li>Sessions are held <strong>online</strong> through a video conferencing app (for example Zoom or Google Meet) or <strong>face to face</strong> within Tarakan City, as agreed by the Parties for each Session. The Session link or location is shared through the chat on the Site or Refa Learn's official WhatsApp.</li>
<li>This service is non-formal education. Refa Learn does not issue diplomas and does not administer official third-party exams.</li>
<li>Refa Learn will provide the service diligently and professionally, but <strong>does not promise or guarantee</strong> any exam score, pass or admission to any institution, as these also depend on the Student's own effort and on other parties.</li>
</ol>

<h3>Article 3 — Booking and Schedule Confirmation</h3>
<ol>
<li>The Student books a Session or Weekly Series through the Site by choosing an available slot and accepting this Agreement.</li>
<li>A booking is <strong>"awaiting confirmation"</strong> until Refa Learn accepts or declines it. The Agreement for a Session becomes binding on the Parties for that Session when Refa Learn confirms it.</li>
<li>Refa Learn may decline a request for availability or other reasonable grounds and will inform the Student through the Site and/or email. Declining a request costs the Student nothing.</li>
<li>A Student who arrives late still ends the Session at the scheduled time. If the Tutor is late, the lost time is made up in that Session or the next one, as agreed.</li>
</ol>

<h3>Article 4 — Fees</h3>
<ol>
<li>The fee per Session depends on the day the Session takes place:
<ul><li>Monday – Friday: <strong>Rp 100.000</strong> per session</li><li>Saturday: <strong>Rp 150.000</strong> per session</li><li>Sunday: <strong>Rp 200.000</strong> per session</li></ul>
</li>
<li>These fees are final. There is no registration fee, down payment or other hidden charge beyond what this Agreement expressly provides.</li>
<li>Future fee changes <strong>do not apply</strong> to Sessions confirmed before the change is announced.</li>
</ol>

<h3>Article 5 — Payment After Class</h3>
<ol>
<li>The Student pays <strong>after</strong> Sessions take place. At the start of each month, Refa Learn issues a Monthly Invoice listing each Session (date, day type and fee) marked "completed" in the previous month or earlier that has not been invoiced before.</li>
<li>Only Sessions marked <strong>"completed"</strong> are invoiced. Sessions that are cancelled, declined or recorded as "no-show" are not invoiced, except for cancellation fees under Article 7.</li>
<li>The Monthly Invoice is due <strong>7 calendar days</strong> after it is issued.</li>
<li>Payment is made by bank transfer or e-wallet <strong>only to the account shown on the Site dashboard</strong>, after which the Student uploads the payment proof through the Site. Refa Learn never asks for payment to any other account; payment to any other account is at the Student's own risk.</li>
<li>Payment is settled once Refa Learn confirms it on the Site. If a payment proof does not match, Refa Learn will explain why and the Student may upload the correct proof.</li>
</ol>

<h3>Article 6 — Paying Up Front (Optional)</h3>
<ol>
<li>The Student may choose to pay for a booking up front. This is voluntary.</li>
<li>If the Student has unpaid cancellation fees and chooses to pay up front, those fees are waived once the up-front payment is confirmed.</li>
<li>Sessions paid up front are not invoiced again in the Monthly Invoice. If a Session paid up front does not take place because Refa Learn cancels it or because of force majeure, the Student may choose a full refund for that Session or a free reschedule.</li>
</ol>

<h3>Article 7 — Cancellation and Rescheduling by the Student</h3>
<ol>
<li>The Student may cancel a request that is <strong>not yet confirmed</strong> at any time, free of charge.</li>
<li>The Student may cancel a <strong>confirmed</strong> Session free of charge by cancelling through the Site at least <strong>12 hours</strong> before the Session starts.</li>
<li>Cancelling a confirmed Session less than 12 hours before it starts incurs a cancellation fee of <strong>Rp 50.000 per cancellation action</strong>, however many Sessions are cancelled together in that action. This fee compensates the time the Tutor has set aside and is added to the next Monthly Invoice.</li>
<li>Instead of cancelling, the Student may request a <strong>reschedule</strong> through the Site before the Session starts, free of charge, provided a replacement slot is available and Refa Learn approves it. If it is not approved, the original schedule stands.</li>
<li>The Tutor waits up to 15 (fifteen) minutes after the start time. A Student who does not attend without notice is recorded as "no-show"; that Session is not invoiced, but repeated no-shows without notice may be a reasonable ground for Refa Learn to decline future bookings.</li>
<li>Sessions that have started or passed cannot be cancelled or rescheduled.</li>
</ol>

<h3>Article 8 — Cancellation by Refa Learn</h3>
<ol>
<li>Refa Learn may cancel or move a Session for reasonable grounds (for example illness or an urgent matter), notifying the Student as soon as possible.</li>
<li>A cancellation by Refa Learn costs the Student nothing. Refa Learn will offer a replacement time, and Article 6 paragraph (3) applies to Sessions paid up front.</li>
</ol>

<h3>Article 9 — Late Payment</h3>
<ol>
<li>A Monthly Invoice still unpaid after its due date becomes "overdue", and the Student is notified through the Site and/or email.</li>
<li>While any invoice is overdue, <strong>new Session bookings are paused</strong> until that invoice is confirmed as paid. Sessions already confirmed go ahead as planned.</li>
<li>Refa Learn <strong>charges no interest or late-payment penalty</strong> beyond what this Agreement provides. An unpaid invoice remains a debt of the Student that may be collected in accordance with applicable law.</li>
</ol>

<h3>Article 10 — Learning Materials and Copyright</h3>
<ol>
<li>All modules, worksheets, recordings and other materials provided or sold by Refa Learn are protected by Law No. 28 of 2014 on Copyright.</li>
<li>The Student receives a personal, non-transferable right of use. The Student may not copy, sell, share or upload these materials to others without Refa Learn's written permission.</li>
<li>Sessions are not recorded unless the Parties agree before the Session starts. Agreed recordings are for the Student's learning only.</li>
</ol>

<h3>Article 11 — Buying Digital Materials</h3>
<ol>
<li>The price of each digital material is shown on its page on the Site. Download access is granted once payment is confirmed and lasts <strong>indefinitely</strong> through the Student's dashboard, including if the material is later no longer sold.</li>
<li>If a material file is damaged, cannot be opened or does not match its description, the Student may report it through the Site chat. Refa Learn must fix or replace the file within 7 (seven) working days; if it cannot be fixed, Refa Learn refunds the Student in full.</li>
</ol>

<h3>Article 12 — Personal Data Protection</h3>
<ol>
<li>Refa Learn processes the Student's personal data in line with Law No. 27 of 2022 on Personal Data Protection, namely: name, phone/WhatsApp number, email address, Session history and notes, chat content, invoices, payment proofs, and technical records of acceptance (IP address, browser type and time of acceptance).</li>
<li>This data is processed only to perform this Agreement (scheduling, teaching, invoicing, communication and proof of acceptance) and to meet legal obligations, on the basis of performing the agreement and the Student's consent.</li>
<li>Personal data of a Student who is a <strong>child</strong> is processed with the consent of the Parent/Guardian.</li>
<li>Payment proofs and other documents are kept in storage that is not publicly accessible and can only be viewed by the Student concerned and Refa Learn. Refa Learn does not sell or share the Student's personal data with others, except with the technology providers needed to run the Site (data storage, email, video conferencing) or where required by law.</li>
<li>Data is kept while the account is active and for as long as needed to meet legal obligations, including bookkeeping and proof.</li>
<li>The Student may request access, a copy, an update, a correction or deletion of their data, and may withdraw consent, by contacting the admin through the chat menu on this website. Withdrawing consent does not affect processing already carried out or obligations not yet settled.</li>
<li>If personal data protection fails, Refa Learn will notify the Student within 3 x 24 (three times twenty-four) hours.</li>
</ol>

<h3>Article 13 — Conduct and Child Protection</h3>
<ol>
<li>The Parties must be polite and respectful to each other and must not bully, harass or discriminate in any form.</li>
<li>For a Student who is a child, the Parent/Guardian may accompany or monitor Sessions. Face-to-face Sessions with a child take place in an open setting or at the Student's home with the Parent/Guardian's knowledge.</li>
<li>Communication outside Sessions takes place through the Site chat or Refa Learn's official channels.</li>
</ol>

<h3>Article 14 — Force Majeure</h3>
<p>Neither Party is liable for a Session not taking place because of circumstances beyond reasonable control, including natural disasters, floods, widespread power or internet outages, epidemics, illness or government policy. In such cases the Session is rescheduled without a cancellation fee.</p>

<h3>Article 15 — Ending the Agreement</h3>
<ol>
<li>The Student may stop at any time by cancelling upcoming Sessions in line with Article 7.</li>
<li>Refa Learn may end the service if the Student seriously breaches Article 10 or Article 13, with written notice through the Site or email.</li>
<li>Ending the Agreement does not cancel the obligation to pay for Sessions already completed and fees already incurred.</li>
</ol>

<h3>Article 16 — Governing Law and Disputes</h3>
<ol>
<li>This Agreement is governed by and interpreted under the laws of the Republic of Indonesia.</li>
<li>Any dispute is first settled amicably within 30 (thirty) days after one Party notifies the other of it in writing.</li>
<li>If that fails, the Parties agree to settle it through the <strong>Tarakan District Court</strong>, without prejudice to the Student's right as a consumer to seek settlement through the competent Consumer Dispute Settlement Body (BPSK) under Law No. 8 of 1999 on Consumer Protection.</li>
</ol>

<h3>Article 17 — Changes to the Agreement</h3>
<ol>
<li>Refa Learn may issue a new version of this Agreement. A new version applies only to bookings made <strong>after</strong> the Student has read and accepted it.</li>
<li>Sessions booked under an earlier version remain subject to the version accepted at the time of booking.</li>
</ol>

<h3>Article 18 — Final Provisions</h3>
<ol>
<li>This Agreement is made in Indonesian. Where there is a translation, the Indonesian version prevails.</li>
<li>Acceptance given by ticking the agreement statement and typing one's full name on the Site is a valid and binding <strong>electronic signature</strong>. The electronic record of that acceptance (Agreement version, name, time, IP address and device) is valid legal evidence.</li>
<li>The validity of this Agreement does not depend on a duty stamp (meterai). If this Agreement is to be used as evidence in court, the stamp duty may be paid afterwards under Law No. 10 of 2020 on Stamp Duty.</li>
<li>If any provision of this Agreement is held invalid or unenforceable, the other provisions remain in force.</li>
<li>A copy of the version of the Agreement the Student accepted can be viewed and downloaded at any time through the Site.</li>
</ol>

<h3>Statement of Acceptance</h3>
<p>By ticking the acceptance box and typing their full name, the signer declares that:</p>
<ol>
<li>they have read, understood and agree to the whole of this Agreement without coercion;</li>
<li>they <strong>are 21 (twenty-one) years of age or older, or married</strong>, and therefore legally capable (Articles 330 and 1330 of the Civil Code), <strong>or</strong> they are the lawful Parent/Guardian of a Student who is a minor and accept this Agreement on the Student's behalf and in the Student's interest, including consent to the processing of the child's personal data; and</li>
<li>the data they have given Refa Learn is true.</li>
</ol>$en$
where version = 2 and content_en is null;
