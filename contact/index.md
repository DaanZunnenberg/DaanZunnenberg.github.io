---
layout: default
title: Contact
permalink: /contact/
---

<h1>Contact</h1>
<p class="tagline">Questions on the research, a project, or a role &mdash; get in touch.</p>

<div class="links">
  <a href="mailto:dw.zunnenberg@gmail.com">dw.zunnenberg@gmail.com</a>
  <a href="https://github.com/DaanZunnenberg">GitHub</a>
  <a href="https://www.linkedin.com/in/daanzunnenberg/">LinkedIn</a>
  <a href="https://scholar.google.com/citations?user=JLg2KjEAAAAJ">Google Scholar</a>
</div>

<h2>Send a message</h2>

<form class="contact-form" action="https://formsubmit.co/dw.zunnenberg@gmail.com" method="POST">
  <input type="hidden" name="_subject" value="New message from daanzunnenberg.github.io">
  <input type="hidden" name="_template" value="table">
  <input type="hidden" name="_captcha" value="true">
  <input type="hidden" name="_next" value="https://daanzunnenberg.github.io/contact/?sent=1">
  <input type="text" name="_honey" style="display:none">

  <label for="name">Name</label>
  <input id="name" type="text" name="name" required>

  <label for="email">Email</label>
  <input id="email" type="email" name="email" required>

  <label for="message">Message</label>
  <textarea id="message" name="message" rows="6" required></textarea>

  <button type="submit">Send message</button>
</form>

<p id="sent-note" class="sent-note">Thanks &mdash; your message was sent. I'll get back to you by email.</p>
