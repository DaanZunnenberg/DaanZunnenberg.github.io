---
layout: default
title: Proof of the Fundamental Theorem of Empirical Processes
permalink: /mathematics/fundamental-theorem-of-empirical-processes/
---

<h1>The Fundamental Theorem of Empirical Processes</h1>
<p class="tagline">Chaining and the peaky part: why an empirical process always splits into a chained piece and a piece with no cancellation.</p>

<h2>Introduction</h2>

<p>
We prove the Fundamental Theorem of Empirical Processes, the statement that a class \(\mathcal F\) of functions controlling an empirical process \(S_N(\mathcal F)\) decomposes as \(\mathcal F \subset T_1+T_2\), with \(T_1\) controlled by chaining and \(T_2\) by an uncancelled sum of absolute values, both pieces of size at most \(LS_N(\mathcal F)\). The proof rests on the Latała&ndash;Bednorz theorem, which settles the same question for Bernoulli processes. We first state the Latała&ndash;Bednorz theorem and sketch its proof, with emphasis on its decomposition lemma and partitioning scheme. We then pass, by generalizing linear sums of signs to random series of functions, to the general setting of random series, state the general lower bound it obeys, and specialize it to empirical processes. We finally give the complete proof.
</p>

<h2>Bernoulli processes and the Latała&ndash;Bednorz theorem</h2>

<p>
Denote by \(\varepsilon_i\) independent Bernoulli random variables, \(\mathsf{P}(\varepsilon_i=\pm 1)=1/2\). For \(t=(t_i)_{i\ge 1}\in\ell_2\) set \(X_t = \sum_{i\ge 1} t_i\varepsilon_i\). For \(T\subset \ell_2\), the family \((X_t)_{t\in T}\) is the Bernoulli process defined by \(T\), and
</p>

<p>
\[
b(T) := \mathsf{E}\sup_{t\in T} X_t.
\]
</p>

<p>
The sub-Gaussian inequality for sums \(\sum\varepsilon_i t_i\) gives \(b(T)\le L\gamma_2(T)\) by chaining. Trivially, \(b(T) \le \sup_{t\in T}\|t\|_1\), without any cancellation. Since \(X_{t^1+t^2} = X_{t^1}+X_{t^2}\), if \(T\subset T_1+T_2\) then \(b(T)\le b(T_1)+b(T_2)\), and mixing the two bounds
</p>

<p>
\[
b^*(T) := \inf\Big\{\gamma_2(T_1) + \sup_{t\in T_2}\|t\|_1 \ ;\ T\subset
T_1+T_2\Big\}
\]
</p>

<p>
also bounds \(b(T)\) from above, \(b(T)\le Lb^*(T)\). The Bernoulli conjecture asked whether this is sharp.
</p>

<div class="math-env">
  <p><span class="math-env-label">Theorem (The Latała&ndash;Bednorz theorem).</span>
  There is a universal constant \(L\) such that for every \(T\subset\ell_2\),
  </p>
\[
b^*(T) \le Lb(T).
\]
</div>

<p>
We sketch its proof in the next section, with all the technical machinery it requires. Only once this is done do we move to empirical processes.
</p>

<h2>Proof of the Latała&ndash;Bednorz theorem</h2>

<p>
Two mechanisms bound \(b(T)\) from above. Cancellation, controlled by \(\gamma_2(T)\) through chaining, and absence of cancellation, controlled by \(\sup_t\|t\|_1\). The functional \(b^*(T)\) mixes the two through a decomposition \(T\subset T_1+T_2\). The Latała&ndash;Bednorz theorem states these are the only mechanisms, up to a constant. Its proof produces, for each \(t\in T\), a decomposition \(t=t^1+t^2\) with \(\|t^2\|_1 \le Lb(T)\) and \(T_1=\{t^1\ ;\ t\in T\}\) satisfying \(\gamma_2(T_1)\le Lb(T)\). The decomposition is not canonical. Take \(T_1\) with \(\gamma_2(T_1)\le 1\), so \(b(T_1)\le L\). To each \(t\in T_1\) attach \(\varphi(t)\) with \(\|\varphi(t)\|_1\le 1\) and set \(T = \{t+\varphi(t)\ ;\ t\in T_1\}\), so \(b(T)\le L\). Given only \(T\), nothing in general recovers \(T_1\).
</p>

<p>
The prototype of the decomposition lemma is a comparison principle due to Latała. Fix \(J\subset\mathbb N^*\), write \(b_J(T):=\mathsf{E}\sup_{t\in T} \sum_{i\in J}\varepsilon_i t_i \le b(T)\). There are two typical, not mutually exclusive, reasons for \(b_J(T) \ll b(T)\). The diameter of \(T\) for the full distance \(d\) already equals the diameter for \(d_J\), the distance restricted to \(J\). Or \(b_J(T)\) is genuinely smaller. Once the supremum norm on \(T\) is controlled, one of the two holds outright on each piece of a partition of controlled size.
</p>

<div class="math-env">
  <p><span class="math-env-label">Proposition (Latała's principle).</span>
  There is a universal \(L_1\) with the following property. Let \(T\subset \ell_2\), \(J\subset\mathbb N^*\), \(c,\sigma>0\), \(m\ge 2\), with
  </p>
\[
\forall s,t\in T,\qquad \sum_{i\in J}(s_i-t_i)^2 \le c^2, \qquad \forall
t\in T,\qquad \|t\|_\infty < \frac{8\sigma}{\sqrt{\log m}}.
\]
  <p>
  If \(c\le \sigma/L_1\), there is \(m'\le m+1\) and a partition \((A_\ell)_{\ell \le m'}\) of \(T\) with, for each \(\ell\), either
  </p>
\[
\exists t_\ell\in T,\qquad A_\ell\subset B_2(t_\ell,\sigma),
\]
  <p>
  or
  </p>
\[
b_J(A_\ell) \le b(T) - \frac{\sigma}{L}\sqrt{\log m}.
\]
</div>

<div class="math-env">
  <p><span class="math-env-label">Sketch.</span>
  Fix \(t_0\in T\), replace \(T\) by \(T-t_0\). Write \(Y_t = \sum_{i\in J} \varepsilon_i t_i\), \(Z_t = \sum_{i\notin J}\varepsilon_i t_i\), so \(b(T) =\mathsf{E}\sup_t(Y_t+Z_t)\). Let \(\alpha\) be the infimum, over sets \(F\subset T\) with \(\operatorname{card} F\le m\), of \(\mathsf{E}\sup_{t\notin\bigcup_{s\in F}B(s,\sigma)} Y_t\). Choose \(t^1,\dots,t^m\in T\) greedily, \(t^k\) nearly achieving \(\sup_{t\notin\bigcup_{\ell<k}B(t^\ell,\sigma)} Y_t^k\) for an independent copy \(Y^k\) of \(Y\). Sudakov's minoration for Bernoulli processes,
  </p>
\[
\mathsf{E}\sup_{\ell\le m}\sum_i\varepsilon_i t^\ell_i \ge \frac1L
\min\big(a\sqrt{\log m},\ a^2/b\big) \qquad (\|t^\ell-t^{\ell'}\|_2\ge a,\
\|t^\ell\|_\infty\le b),
\]
  <p>
  gives a lower bound on \(\mathsf{E}\max_k(Y^k_{t^k}+Z_{t^k})\) using the separation of the \(t^k\) and the part \(Z\) living on \(J^c\). Concentration of measure for Bernoulli processes gives a matching upper bound through \(b(T)\) itself. Comparing the two forces \(\alpha \le b(T) - \sigma \sqrt{\log m}/L\), and the partition \(A_\ell = T\cap B(t^\ell,\sigma)\), \(A_{m+1}=T\setminus\bigcup_\ell B(t^\ell,\sigma)\), gives the proposition.
  </p>
</div>

<p>
Latała's principle controls \(d_J\), not the full distance \(d\). Chopping maps repair this. Replace \(\varepsilon_i t_i\) by \(\sum_j \varepsilon_{i,j}t_{i,j}\), a sum of independent Bernoulli terms on small pieces \(t_{i,j}\) of \(t_i\), chosen so the resulting process has a much smaller sup norm. Write \(\Phi\) for the chopping map. Then \(b(\Phi(A)) = F(A,I,w,k,h)\), a functional depending on a chopping point \(w\in\ell_2\), a coordinate set \(I\), and scales \(k\le h\). Applying Latała's principle to \(\Phi(T)\) and transporting back through \(\Phi\) gives the actual decomposition lemma of the construction.
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma (Decomposition lemma).</span>
  There is a universal \(L_3\) with the following property. Let \(T\subset \ell_2\), \(b,c>0\), \(\|t\|_\infty\le b\) for all \(t\in T\), \(m\ge 2\), \(b\sqrt{\log m}\le c\). There is \(m'\le m\) and a partition \((B_\ell)_{\ell \le m'}\) of \(T\) with, for each \(\ell\), either
  </p>
\[
\forall D\subset B_\ell,\quad \mathit{\Delta}(D)\le \frac{c}{L_3}\ \Rightarrow\ b(D)
\le b(T) - \frac{c}{L}\sqrt{\log m},
\]
  <p>
  or \(\mathit{\Delta}(B_\ell)\le c\), \(\mathit{\Delta}\) the \(\ell_2\)-diameter.
  </p>
</div>

<p>
This is the decomposition lemma of the Gaussian case, transported to \(b(T)\) through chopping. The partitions themselves iterate a three-way refinement of this dichotomy on the chopping data \((I,w,k,j)\). A subset \(A\) of a piece \(B\in A_n\) falls into exactly one of three cases. Small subsets of \(A\) witness a drop of \(F\) at scale \(j+2\), at the same chopping point. Or \(A\) itself has small diameter at scale \(j+1\), at the same chopping point. Or, third case, no drop is witnessed at the old chopping point \(w\), but one is witnessed after moving to a new chopping point \(w'\in A\) and a correspondingly restricted coordinate set \(I'\),
</p>

<p>
\[
F(A,I',w',j+2,j+2) \le F(T,I,w,k,j+1) - \frac1L 2^n r^{-j-1}, \qquad
\mathit{\Delta}(A,I',w',j+2,j+2) \le 2^{n/2}r^{-j-1}.
\]
</p>

<p>
The third case is Bednorz's contribution. Unlike the Gaussian functional, \(F\) genuinely depends on \(w\), and progress at a finer scale may force a change of chopping point. The partitions are built by recursion, a counter \(p_n(A)\) recording how many steps must elapse before \(A\) is split again, so a diameter bound gained in case two or three survives long enough to be used. Summing the resulting drops of \(F\) along the construction, exactly as the summability lemma does in the Gaussian case, gives the key inequality of the construction, and matching \(F(T,I,w,k,h)\) back to \(b(T)\) closes the proof of the Latała&ndash;Bednorz theorem.
</p>

<p>
This settled the Bernoulli conjecture, open for nearly twenty five years.
</p>

<h2>From Bernoulli processes to random series of functions</h2>

<p>
The Latała&ndash;Bednorz theorem concerns linear sums \(X_t = \sum_i \varepsilon_i t_i\), indexed by coefficient sequences \(t\in\ell_2\). Replace \(t_i\) by a random function \(Z_i(t)\) of \(t\), and \(X_t\) by \(\sum_i \varepsilon_i Z_i(t)\). The Bernoulli process is the special case \(Z_i(t)=t_i\). This setting is general enough to also contain empirical processes, once \(Z_i(t)\) is taken to be \(t(X_i)\) for an independent sample \((X_i)\) and a class of functions \(t\). We now build the corresponding theory, in parallel with what precedes.
</p>

<p>
Fix an index set \(T\), a random sequence \((Z_i)_{i\ge 1}\) of functions on \(T\), not assumed independent, and an independent Bernoulli sequence \((\varepsilon_i)\). Set
</p>

<p>
\[
S := \mathsf{E}\sup_{t\in T} \sum_{i\ge 1} \varepsilon_i Z_i(t).
\]
</p>

<p>
Fix \(r\ge 4\), \(j\in\mathbb Z\). Given a realization \(\omega\) of \((Z_i)\), set
</p>

<p>
\[
\psi_{j,\omega}(s,t) := \sum_{i\ge 1} \big(|r^j(Z_i(s)-Z_i(t))|^2 \wedge 1
\big),
\]
</p>

<p>
\[
\varphi_j(s,t) := \mathsf{E}\psi_{j,\omega}(s,t).
\]
</p>

<p>
The family \((\varphi_j)_{j\in\mathbb Z}\) of squared distances on \(T\) is the device by which the size of \(T\) is measured, in place of the single distance \(d\) of the linear case. We assume throughout
</p>

<p>
\[
\forall j\in\mathbb Z,\ \forall s,t\in T,\qquad \mathsf{P}\big(
\psi_{j,\omega}(s,t)\le \varphi_j(s,t)/4\big) \le \exp(-\varphi_j(s,t)/4).
\]
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  The condition above holds when the \(Z_i\) are independent.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof.</span>
  Bernstein's inequality applied to \(W_i = |r^j(Z_i(s)-Z_i(t))|^2\wedge 1\) and \(A=\varphi_j(s,t)/4 = \tfrac14\sum_i\mathsf{E}W_i\) gives the condition above directly.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Theorem (The General Lower Bound).</span>
  Assume \(T\) countable. There is an admissible sequence \((A_n)\) of partitions of \(T\) and, for \(A\in A_n\), an integer \(j_n(A)\), such that
  </p>
\[
\forall t\in T,\qquad \sum_{n\ge 0} 2^n r^{-j_n(A_n(t))} \le KS,
\]
\[
A\in A_n,\ C\in A_{n-1},\ A\subset C \ \Rightarrow\ j_{n-1}(C) \le j_n(A)
\le j_{n-1}(C)+1,
\]
\[
s,t\in A\in A_n \ \Rightarrow\ \varphi_{j_n(A)}(s,t) \le 2^{n+2}.
\]
</div>

<p>
We prove this in Section 5. It is the exact analogue, for the family \((\varphi_j)\), of the existence of a majorizing measure witnessing \(b(T)\). The dependence on the Latała&ndash;Bednorz theorem is not merely thematic. The proof below uses, as a black box, a bound
</p>

<p>
\[
\int I_\mu\,d\mu \le Lr^3 b(T)
\]
</p>

<p>
for a functional \(I_\mu\) built from a majorizing measure \(\mu\) on a set \(T\subset\ell_2\) carrying the canonical family of distances of a Bernoulli process. This bound is proved directly from an admissible sequence of partitions, but its last step, converting a bound on the partition functional into a bound on \(b(T)\) itself, is exactly the equivalence of \(b(T)\) with the size of the best admissible sequence of partitions for the canonical family of distances on \(\ell_2\), an equivalence that rests on the Latała&ndash;Bednorz theorem. The General Lower Bound for random series of functions is built on top of it.
</p>

<p>
We record two further ingredients before specializing to empirical processes. The first controls \(\mathsf{E}\sup_t\sum_i|t(X_i)|\) by the corresponding sum with signs and the individual means.
</p>

<div class="math-env">
  <p><span class="math-env-label">Theorem (The Giné&ndash;Zinn theorem).</span>
  With \(\bar S(T):=\mathsf{E}\sup_{t\in T}\big|\sum_{i\le N}\varepsilon_i t(X_i)\big|\),
  </p>
\[
\mathsf{E}\sup_{t\in T}\sum_{i\le N}|t(X_i)| \le \sup_{t\in T}\sum_{i\le N}
\mathsf{E}|t(X_i)| + 4\bar S(T).
\]
</div>

<p>
The second is proved by an independent argument. It decomposes a class controlled by \((\varphi_j)\) into a chaining part, an \(L_1\)-small part, and a peaky part. Its proof is by the author's own account not appealing, and we cite it here as a black box.
</p>

<div class="math-env">
  <p><span class="math-env-label">Theorem (The peaky part decomposition theorem).</span>
  Consider a countable \(T\) of measurable functions on \(\Omega\), \(r\ge 2\), \(0\in T\), an admissible sequence \((A_n)\) of \(T\), and \(j_n(A)\in\mathbb Z\) for \(A\in A_n\), with, for a parameter \(u>0\),
  </p>
\[
\forall n\ge 0,\ \forall s,t\in A\in A_n,\qquad \int
|r^{j_n(A)}(s(\omega)-t(\omega))|^2\wedge 1\,d\nu(\omega) \le u2^n.
\]
  <p>
  Let \(S:=\sup_{t\in T}\sum_{n\ge 0} 2^n r^{-j_n(A_n(t))}\). Then \(T\subset T_1+T_2+T_3\), \(0\in T_1\),
  </p>
\[
\gamma_2(T_1,d_2) \le L\sqrt u S,
\]
\[
\gamma_1(T_1,d_\infty) \le LS,
\]
\[
\forall t\in T_2,\qquad \|t\|_1 \le LuS,
\]
  <p>
  and \(\forall t\in T_3\) there is \(s\in T\) with \(|t| \le 5|s|1_{\{2|s|\ge r^{-j_0(t)}\}}\).
  </p>
</div>

<h2>Empirical processes and the Fundamental Theorem</h2>

<p>
We now specialize \(Z_i(t) = t(X_i)\). Fix a probability space \((\Omega,\mu)\), a countable bounded class \(\mathcal F\subset L_2(\mu)\) with \(\mu(t)=0\) for \(t\in\mathcal F\), i.i.d. \((X_i)_{i\ge 1}\) valued in \(\Omega\) and distributed as \(\mu\), and an integer \(N\). Set
</p>

<p>
\[
S_N(\mathcal F) := \mathsf{E}\sup_{t\in\mathcal F} \sum_{i\le N} t(X_i).
\]
</p>

<p>
As in the Bernoulli case, a trivial bound holds without cancellation, \(S_N(\mathcal F) \le 2\mathsf{E}\sup_{t\in\mathcal F}\sum_{i\le N} |t(X_i)|\), and Bernstein's inequality gives a chaining bound, valid when \(0\in\mathcal F\),
</p>

<p>
\[
S_N(\mathcal F) \le L\big(\sqrt N \gamma_2(\mathcal F,d_2) +
\gamma_1(\mathcal F,d_\infty)\big),
\]
</p>

<p>
where \(d_2,d_\infty\) are the distances induced by the \(L_2(\mu)\) and \(L_\infty(\mu)\) norms, the two distances that replace the single \(\ell_2\)-distance of the Bernoulli case, exactly as \((\varphi_j)\) replaces \(d\) in the general setting of Section 3. Interpolating, for \(\mathcal F\subset T_1+T_2\) with \(0\in T_1\),
</p>

<p>
\[
S_N(\mathcal F) \le L\big(\sqrt N\gamma_2(T_1,d_2) + \gamma_1(T_1,
d_\infty)\big) + 2\mathsf{E}\sup_{t\in T_2}\sum_{i\le N}|t(X_i)|.
\]
</p>

<p>
That this interpolation is not merely sufficient but necessary is the theorem we prove.
</p>

<div class="math-env">
  <p><span class="math-env-label">Theorem (The Fundamental Theorem of Empirical Processes).</span>
  Under the above hypotheses there is a decomposition \(\mathcal F\subset T_1+T_2\) with \(0\in T_1\) such that
  </p>
\[
\gamma_2(T_1,d_2) \le \frac{L}{\sqrt N} S_N(\mathcal F), \qquad
\gamma_1(T_1,d_\infty) \le LS_N(\mathcal F), \qquad \mathsf{E}\sup_{t\in
T_2}\sum_{i\le N}|t(X_i)| \le LS_N(\mathcal F).
\]
</div>

<p>
The proof, given in Section 5, combines the General Lower Bound with the Giné&ndash;Zinn theorem and the peaky part decomposition theorem.
</p>

<h2>Proof of the lower bound</h2>

<p>
We prove the General Lower Bound (Theorem) and derive from it the Fundamental Theorem of Empirical Processes. Notation is that of Section 3: \(T\), \((Z_i)\), \(S\), and the family \((\varphi_j)\) under the condition \(\mathsf{P}(\psi_{j,\omega}(s,t)\le \varphi_j(s,t)/4)\le\exp(-\varphi_j(s,t)/4)\) imposed there.
</p>

<p>
Assume \(T\) finite. Define
</p>

<p>
\[
j_0 = \sup\{j\in\mathbb Z\ ;\ \forall s,t\in T,\ \varphi_j(s,t)\le 4\}
\in\mathbb Z\cup\{\infty\}.
\]
</p>

<p>
Let \(M^+\) be the probability measures \(\mu\) on \(T\) with \(\mu(\{t\})>0\) for every \(t\). For \(\mu\in M^+\), \(t\in T\), set \(\bar j_0(t) = j_0\) and, for \(n\ge 1\),
</p>

<p>
\[
\bar j_n(t) = \sup\{j\in\mathbb Z\ ;\ \mu(B_j(t,2^n)) \ge N_n^{-1}\}
\in\mathbb Z\cup\{\infty\},
\]
</p>

<p>
\(B_j(t,2^n) = \{s\in T\ ;\ \varphi_j(s,t)\le 2^n\}\). The sequence \((\bar j_n(t))\) increases. Set
</p>

<p>
\[
J_\mu(t) := \sum_{n\ge 0} 2^n r^{-\bar j_n(t)}.
\]
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma (Main Lemma).</span>
  For \(\mu\in M^+\),
  </p>
\[
\int J_\mu(t)\,d\mu(t) \le KS,
\]
  <p>
  \(K\) depending on \(r\) only.
  </p>
</div>

<p>
Given \(\omega\), set \(j_{0,\omega} = \sup\{j\ ;\ \forall s,t,\ \psi_{j,\omega}(s,t)\le 1\}\), \(j_{0,\omega}(t)=j_{0,\omega}\), and for \(n\ge 1\),
</p>

<p>
\[
j_{n,\omega}(t) = \sup\{j\in\mathbb Z\ ;\ \mu(\{s\ ;\ \psi_{j,\omega}(t,s)
\le 2^n\}) \ge N_n^{-1}\} \in\mathbb Z\cup\{\infty\}.
\]
</p>

<p>
\((j_{n,\omega}(t))\) increases. Set \(I_{\mu,\omega}(t) := \sum_{n\ge 0} 2^n r^{-j_{n,\omega}(t)}\). Given \(\omega\), identify \(t\in T\) with \((Z_i(t))_i\in\ell_2\), so \(X_t = \sum_i\varepsilon_i Z_i(t)\) is a Bernoulli process on \(T\subset\ell_2\). The following is a consequence of the Latała&ndash;Bednorz theorem, proved directly from the definitions using an admissible sequence of partitions witnessing \(b(T)\).
</p>

<div class="math-env">
  <p><span class="math-env-label">Theorem (Lower bound from a measure).</span>
  For any probability measure \(\mu\) on \(T\subset\ell_2\),
  </p>
\[
\int_T I_\mu(t)\,d\mu(t) \le Lr^3 b(T).
\]
</div>

<p>
Applied at fixed \(\omega\) and taking expectation,
</p>

<p>
\[
\mathsf{E}\int I_{\mu,\omega}(t)\,d\mu(t) \le KS.
\]
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  \(J_\mu(t) \le L\,\mathsf{E}I_{\mu,\omega}(t)\) for each \(t\).
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof.</span>
  We prove
  </p>
\[
\mathsf{P}(j_{0,\omega}(t)\le \bar j_0(t)) \ge 1/L,
\]
\[
n\ge 3\ \Rightarrow\ \mathsf{P}(j_{n-3,\omega}(t)\le \bar j_n(t)) \ge 1/2.
\]
  <p>
  These give \(\mathsf{E}r^{-j_{0,\omega}(t)} \ge r^{-j_0}/L\) and, for \(n\ge 3\), \(\mathsf{E}2^{n-3}r^{-j_{n-3,\omega}(t)} \ge 2^n r^{-\bar j_n(t)}/L\). Summing and using \(2^n r^{-\bar j_n(t)} \le 4r^{-j_0} \le 4\mathsf{E} r^{-j_{0,\omega}(t)}\) for \(n\le 2\), since \((\bar j_n(t))\) increases, gives the lemma.
  </p>
  <p>
  If \(j_0=\infty\), the first inequality above is vacuous. Otherwise there are \(s,t\in T\) with \(\varphi_{j_0+1}(s,t)>4\), and the condition on \(\psi_{j,\omega}\) gives \(\mathsf{P}(\psi_{j_0+1,\omega}(s,t)>1) \ge 1-1/e\). This event forces \(j_{0,\omega}\le j_0\), proving the first inequality above.
  </p>
  <p>
  For the second inequality above, if \(\bar j_n(t)=\infty\) there is nothing to prove. Otherwise
  </p>
\[
\mu_1 := \mu(\{s\ ;\ \varphi_{\bar j_n(t)+1}(t,s)\le 2^n\}) \le
N_n^{-1}.
\]
  <p>
  For \(n\ge 2\), the condition on \(\psi_{j,\omega}\) gives, when \(\varphi_{\bar j_n(t)+1}(s,t)\ge 2^n\), \(\mathsf{P}(\psi_{\bar j_n(t)+1,\omega}(s,t)\le 2^{n-2}) \le \exp(-2^{n-2}) \le N_{n-2}^{-1}\), so
  </p>
\[
\mathsf{E}\mu\big(\{s\ ;\ \varphi_{\bar j_n(t)+1}(s,t)\ge 2^n,\ \psi_{\bar
j_n(t)+1,\omega}(s,t)\le 2^{n-2}\}\big) \le N_{n-2}^{-1},
\]
  <p>
  and by Markov's inequality, with probability \(\ge 1/2\),
  </p>
\[
\mu_2 := \mu(\{s\ ;\ \varphi_{\bar j_n(t)+1}(s,t)\ge 2^n,\ \psi_{\bar
j_n(t)+1,\omega}(s,t)\le 2^{n-2}\}) \le 2N_{n-2}^{-1}.
\]
  <p>
  On this event, with the bound on \(\mu_1\) above, \(\mu(\{s\ ;\ \psi_{\bar j_n(t)+1,\omega}(s,t) \ge 2^{n-2}\}) \le \mu_1+\mu_2 \le N_n^{-1}+2N_{n-2}^{-1} < N_{n-3}^{-1}\), so \(j_{n-3,\omega}(t) \le \bar j_n(t)\), proving the second inequality above.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof of the Main Lemma.</span>
  Combine the previous lemma with the displayed bound \(\mathsf{E}\int I_{\mu,\omega}(t)\,d\mu(t) \le KS\) above.
  </p>
</div>

<p>
We convert this pointwise bound, valid for every \(\mu\in M^+\), into a single measure. Fernique's convexity lemma is the tool.
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma (Fernique).</span>
  Let \(a>0\), \(S\) a set of functions on a finite set \(T\). If for every probability measure \(\nu\) on \(T\) there is \(f\in S\) with \(\int f\,d\nu\le a\), then for every \(\varepsilon>0\) there is \(f\) in the convex hull of \(S\) with \(f\le a+\varepsilon\) everywhere.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof.</span>
  Let \(S^+ = \{g\ ;\ \exists f\in S,\ g\ge f\}\), \(C\) its closed convex hull. Suppose the constant function \(a\) is not in \(C\). By Hahn&ndash;Banach there is a linear functional \(\phi\) with \(\phi(f)>\phi(a)\) for \(f\in C\). For \(g\ge 0\), \(\lambda>0\), \(f\in S\), \(f+\lambda g\in C\), so \(\phi(f)+\lambda\phi(g) >\phi(a)\), and letting \(\lambda\to\infty\), \(\phi(g)\ge 0\), so \(\phi\) is positive. As \(T\) is finite, \(\phi(g) = \sum_{t}\alpha_t g(t)\), \(\alpha_t\ge 0\). Set \(\beta=\sum_t\alpha_t\), \(\nu(\{t\})=\alpha_t/\beta\), so \(\phi(g) = \beta\int g\,d\nu\), and \(g=a\) gives \(\beta a = \phi(a)\). By hypothesis there is \(f\in C\) with \(\int f\,d\nu\le a\), so \(\phi(f) = \beta\int f\,d\nu \le \beta a = \phi(a)\), a contradiction. So \(a\in C\), and the lemma follows.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Theorem (Majorizing measure).</span>
  Assume \(T\) finite. There is a probability measure \(\mu\) on \(T\) with
  </p>
\[
\sup_{t\in T} J_\mu(t) \le KS.
\]
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof.</span>
  Let \(\mathcal S = \{f = J_\mu\ ;\ \mu\in M^+\}\). Given \(\nu\) on \(T\), take \(\mu = \nu/2+\lambda/2\), \(\lambda\) uniform, so \(\mu\ge\nu/2\) and, by the Main Lemma,
  </p>
\[
\int J_\mu\,d\nu \le 2\int J_\mu\,d\mu \le KS.
\]
  <p>
  Fernique's lemma applied to \(\mathcal S\) gives \(f\in\mathrm{conv}( \mathcal S)\), \(f\le KS+\varepsilon\) everywhere. It remains to see that a convex combination of the \(J_{\mu_i}\) is again, up to \(L\), a single \(J_\mu\). Fix \(t\). For \(n\ge 1\) let
  </p>
\[
U_n := \Big\{i\ ;\ r^{-\bar j_{n,i}(t)} \le 2\sum_s \alpha_s r^{-\bar
j_{n,s}(t)}\Big\}.
\]
  <p>
  Markov's inequality, applied to \(f(i)=r^{-\bar j_{n,i}(t)}\) under \(P(\{i\})=\alpha_i\), gives \(\sum_{i\in U_n}\alpha_i\ge 1/2\). Let \(j_n\) be smallest with \(r^{-j_n} \le 2\sum_i\alpha_i r^{-\bar j_{n,i}(t)}\). Then \(\bar j_{n,i}(t)\ge j_n\) for \(i\in U_n\), so \(\mu_i(B_{j_n}(t,2^n)) \ge N_n^{-1}\) for such \(i\), and
  </p>
\[
\mu(B_{j_n}(t,2^n)) \ge N_n^{-1}\sum_{i\in U_n}\alpha_i \ge \frac1{2N_n}
\ge \frac1{N_{n+1}},
\]
  <p>
  so \(\bar j_{n+1}(t) \ge j_n\). Since \(\bar j_0(t) = j_0 = \bar j_{0,i}(t)\) for all \(i\),
  </p>
\[
\sum_n 2^n r^{-\bar j_n(t)} \le L\sum_n 2^n r^{-j_n} \le L\sum_i\alpha_i
\sum_n 2^n r^{-\bar j_{n,i}(t)} = L\sum_i\alpha_i J_{\mu_i}(t),
\]
  <p>
  that is \(J_\mu(t) \le L\sum_i\alpha_i J_{\mu_i}(t)\). Combining with \(f\le KS+\varepsilon\) for \(f=\sum_i\alpha_i J_{\mu_i}\) and letting \(\varepsilon\to 0\) gives the bound of the theorem.
  </p>
</div>

<p>
We pass from \(\mu\) to a sequence of partitions. Since the \(\varphi_j\) are squares of distances, \(\varphi_j(s,t)\le 2(\varphi_j(s,u)+\varphi_j(u,t))\). This gives directly that if \(\varphi_j(s,t)>4a>0\) then \(B_j(s,a)\) and \(B_j(t,a)\) are disjoint.
</p>

<p>
Assume \(T\) finite, \(\mu\) a probability measure on \(T\), \(j_0\in\mathbb Z\) with \(\varphi_{j_0}(s,t)\le 4\) for all \(s,t\in T\), and, for each \(t\in T\), \(n\ge 0\), an integer \(j_n(t)\) with
</p>

<p>
\[
j_0(t)=j_0,
\]
</p>

<p>
\[
j_n(t) \le j_{n+1}(t) \le j_n(t)+1,
\]
</p>

<p>
\[
\mu(B_{j_n(t)}(t,2^n)) \ge N_n^{-1}\quad (n\ge 1).
\]
</p>

<div class="math-env">
  <p><span class="math-env-label">Theorem (Measures to partitions).</span>
  There is an admissible sequence \((A_n)\) of \(T\) and \(j_n(A)\in\mathbb Z\) for \(A\in A_n\) with
  </p>
\[
s,t\in A\in A_n\ \Rightarrow\ \varphi_{j_n(A)}(s,t) \le 2^{n+2},
\]
\[
\forall t\in T,\qquad \sum_{n\ge 0} 2^n r^{-j_n(A_n(t))} \le L\sum_{n\ge 0}
2^n r^{-j_n(t)}.
\]
</div>

<div class="math-env">
  <p><span class="math-env-label">Lemma (Partitioning lemma).</span>
  Let \(A\subset T\), \(j\in\mathbb Z\), \(n\ge 1\), \(\mu(B_j(t,2^n))\ge N_n^{-1}\) for \(t\in A\). There is a partition \(\mathcal A\) of \(A\), \(\operatorname{card}\mathcal A\le N_n\), with, for \(B\in\mathcal A\),
  </p>
\[
s,t\in B\ \Rightarrow\ \varphi_j(s,t) \le 2^{n+4}.
\]
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof.</span>
  Let \(U\subset A\) be maximal with \(\varphi_j(s,t)>2^{n+2}\) for distinct \(s,t\in U\). The balls \(B_j(t,2^n)\), \(t\in U\), are disjoint, each of measure \(\ge N_n^{-1}\), so \(\operatorname{card} U\le N_n\). By maximality the balls \(B_j(t,2^{n+2})\), \(t\in U\), cover \(A\), and satisfy \(\varphi_j(s,t)\le 2^{n+4}\) for \(s,t\) in the same ball, by the quasi-triangle inequality for \(\varphi_j\). Assigning each point of \(A\) to the first ball covering it gives \(\mathcal A\).
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof of Theorem.</span>
  We construct \(A_n\) and \(j_n(A)\), \(A\in A_n\), maintaining, for \(n\ge 2\), \(A\in A_n\),
  </p>
\[
t\in A\ \Rightarrow\ j_{n-2}(t) = j_n(A).
\]
  <p>
  Start with \(A_0=A_1=A_2=\{T\}\), \(j_n(T)=j_0\) for \(n\le 2\). The property we maintain holds at \(n=2\) since \(j_0(t)=j_0=j_2(T)\) for all \(t\).
  </p>
  <p>
  Given \(A_n\), \(n\ge 2\), for \(A\in A_n\), the maintained property gives \(j_{n-2}(t)=j_n(A)\) for \(t\in A\), so by the increment bound \(j_n(t)\le j_{n+1}(t)\le j_n(t)+1\) assumed above, \(j_{n-1}(t)\in \{j_n(A),j_n(A)+1\}\) for \(t\in A\). Set
  </p>
\[
A^0 = \{t\in A\ ;\ j_{n-1}(t)=j_n(A)\}, \qquad A^1 = \{t\in A\ ;\
j_{n-1}(t)=j_n(A)+1\}.
\]
  <p>
  By the measure bound \(\mu(B_{j_n(t)}(t,2^n))\ge N_n^{-1}\) above, used with \(n-1\) and \(j=j_n(A)+1\), the partitioning lemma splits \(A^1\) into at most \(N_{n-1}\) pieces \(B\) with \(\varphi_j(s,t)\le 2^{n+3}\) on \(B\). Set \(j_{n+1}(B)=j_n(A)+1\) for each, so that the diameter bound of the theorem holds at \(n+1\). Leave \(A^0\) unsplit, \(j_{n+1}(A^0)=j_n(A^0)\). This splits \(A\) into at most \(N_{n-1}+1\le N_n\) pieces, so \(\operatorname{card} A_{n+1}\le N_n^2=N_{n+1}\). The maintained property holds at \(n+1\) by construction, hence so does the diameter bound of the theorem. And the sum bound of the theorem follows since \(j_n(A_n(t))=j_0\) for \(n\le 2\) and \(j_n(A_n(t))=j_{n-2}(t)\) for \(n\ge 2\), by the maintained property.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof of the General Lower Bound.</span>
  Assume \(T\) finite. Let \(\mu\) be given by Theorem and \(\bar j_n(t)\) its integers. Set \(j_n(t) = \min_{0\le p\le n}(\bar j_p(t)+n-p)\), so \(j_0(t)=\bar j_0(t)=j_0\), \(j_n(t)\le j_{n+1}(t)\le j_n(t)+1\). Since \(j_n(t)\le \bar j_n(t)\), \(\mu(B_{j_n(t)}(t,2^n))\ge N_n^{-1}\). And \(r^{-j_n(t)} \le \sum_{p\le n} r^{-\bar j_p(t)-n+p}\), so, \(r\ge 4\),
  </p>
\[
\sum_{n\ge 0} 2^n r^{-j_n(t)} \le \sum_{p\ge 0} 2^p r^{-\bar j_p(t)}
\sum_{n\ge p} (2/r)^{n-p} \le 2J_\mu(t) \le 2KS,
\]
  <p>
  by the bound of the majorizing measure theorem. Theorem finishes the finite case.
  </p>
  <p>
  For \(T\) countable, write \(T=\bigcup_k T_k\), \(T_k\) finite increasing. Apply the finite case to each \(T_k\), giving admissible \((A_{n,k})\). Number \((A_{n,k,\ell})_{\ell\le N_n}\), and for \(t\in T_k\) let \(\ell_{n,k}(t)\) be its index. For fixed \(t,n\), \(\ell_{n,k}(t)\) is eventually defined and, after a subsequence, eventually equal to \(\ell_n(t)\). Admissibility gives \(\bar\ell_{n,k}(\ell)\le N_{n-1}\) with \(A_{n,k,\ell}\subset A_{n-1,k,\bar\ell_{n,k}(\ell)}\), eventually equal, after a further subsequence, to \(\bar\ell_n(\ell)\). Set \(A_{n,\ell} = \{t\ ;\ \ell_n(t)=\ell\}\), a partition of \(T\), \(\operatorname{card} A_n\le N_n\), and for \(t\in A_{n,\ell}\), \(k\) large, \(t\in A_{n,k,\ell}\subset A_{n-1,k, \bar\ell_{n,k}(\ell)} = A_{n-1,\bar\ell_n(\ell)}\), so \(A_{n,\ell}\subset A_{n-1,\bar\ell_n(\ell)}\) and \((A_n)\) is admissible. If \((j_0(T_k))_k\) is unbounded, \(\varphi_j\le 4\) everywhere for all \(j\), and the distance bound of the theorem is trivial. Otherwise \((j_0(T_k))_k\) is bounded, so, by the interlacing property \(j_{n-1}(C)\le j_n(A)\le j_{n-1}(C)+1\) of the theorem, each \((j_n(A_{n,k,\ell}))_k\) is bounded, hence eventually equal, after a subsequence, to \(j_n(A_{n,\ell})\). These satisfy the required properties.
  </p>
</div>

<p>
We turn to the Giné&ndash;Zinn theorem. Fix a class \(T\) of functions on \(\Omega\), independent \((X_i)_{i\le N}\) valued in \(\Omega\), an independent Bernoulli sequence \((\varepsilon_i)_{i\le N}\), and \(\bar S(T) = \mathsf{E}\sup_{t\in T}|\sum_{i\le N}\varepsilon_i t(X_i)|\).
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  \(\mathsf{E}\sup_{t\in T}\sum_{i\le N}(t(X_i)-\mathsf{E}t(X_i)) \le 2\bar S(T)\).
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof.</span>
  Let \((X_i')\) be an independent copy of \((X_i)\). Jensen's inequality, taking expectation in \(X_i'\) inside the supremum on the left and outside on the right, gives
  </p>
\[
\mathsf{E}\sup_{t\in T}\sum_{i\le N}(t(X_i)-\mathsf{E}t(X_i)) \le
\mathsf{E}\sup_{t\in T}\sum_{i\le N}(t(X_i)-t(X_i')).
\]
  <p>
  The processes \((t(X_i)-t(X_i'))_i\) and \((\varepsilon_i(t(X_i)-t(X_i')))_i\) have the same law, so the right side is \(\mathsf{E}\sup_t\sum_i \varepsilon_i(t(X_i)-t(X_i'))\), and the triangle inequality finishes.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  \(\mathsf{E}\sup_{t\in T}\sum_{i\le N}\varepsilon_i|t(X_i)| \le 2\bar S(T)\).
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof.</span>
  The contraction principle, \(\mathsf{E}\sup_t\sum_i\varepsilon_i|t_i|\le 2\mathsf{E}\sup_t|\sum_i\varepsilon_i t_i|\), applied at fixed \((X_i)_{i\le N}\).
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof of the Giné&ndash;Zinn theorem.</span>
  Write \(\sum_i|t(X_i)| = \sum_i\mathsf{E}|t(X_i)| + \sum_i(|t(X_i)|- \mathsf{E}|t(X_i)|)\), so
  </p>
\[
\mathsf{E}\sup_{t\in T}\sum_i|t(X_i)| \le \sup_{t\in T}\sum_i\mathsf{E}
|t(X_i)| + \mathsf{E}\sup_{t\in T}\sum_i\big(|t(X_i)|-\mathsf{E}|t(X_i)|
\big).
\]
  <p>
  The first two lemmas, applied to \(\{|t|\ ;\ t\in T\}\), bound the second term by \(4\bar S(T)\).
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  If \(\mathsf{E}t(X_i)=0\) for all \(t\in T\), \(i\le N\), then \(\bar S(T) \le 2\mathsf{E}\sup_{t\in T}\sum_{i\le N} t(X_i)\).
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof.</span>
  Condition on \((\varepsilon_i)\), set \(I=\{i\ ;\ \varepsilon_i=1\}\), \(J=\{i\ ;\ \varepsilon_i=-1\}\),
  </p>
\[
\mathsf{E}\sup_{t\in T}\sum_i\varepsilon_i t(X_i) \le \mathsf{E}\sup_{t\in
T}\sum_{i\in I}t(X_i) + \mathsf{E}\sup_{t\in T}\sum_{i\in J}t(X_i).
\]
  <p>
  With \(\mathsf{E}_J\) expectation in \(X_i\), \(i\in J\), we have \(\mathsf{E}_J X_i=X_i\) for \(i\in I\), \(\mathsf{E}_J X_i = 0\) for \(i\notin I\), and \(\mathsf{E}t(X_i)=0\) gives, by Jensen,
  </p>
\[
\sup_{t\in T}\sum_{i\in I}t(X_i) = \sup_{t\in T}\mathsf{E}_J\sum_{i\le N}
t(X_i) \le \mathsf{E}_J\sup_{t\in T}\sum_{i\le N} t(X_i),
\]
  <p>
  so \(\mathsf{E}\sup_{t\in T}\sum_{i\in I}t(X_i) \le \mathsf{E}\sup_{t\in T}\sum_{i\le N}t(X_i)\), and likewise for \(J\).
  </p>
</div>

<p>
We prove the Fundamental Theorem of Empirical Processes. Consider independent \((X_i)_{i\le N}\) valued in \(\Omega\), \(\lambda_i\) the law of \(X_i\), \(\nu=\sum_{i\le N}\lambda_i\), and a set \(T\) of functions on \(\Omega\). Write
</p>

<p>
\[
S(T) = \mathsf{E}\sup_{t\in T}\sum_{i\le N}\varepsilon_i t(X_i), \qquad
\bar S(T) = \mathsf{E}\sup_{t\in T}\Big|\sum_{i\le N}\varepsilon_i
t(X_i)\Big|.
\]
</p>

<p>
We may assume \(0\in T\), since replacing \(T\) by \(T-t_0\) leaves \(S(T)\) unchanged, and a decomposition of \(T-t_0\) transports to \(T\). Since \(0\in T\), \(\bar S(T)\le 2S(T)\). For \(i\le N\) set \(Z_i(t)=t(X_i)\), \(Z_i=0\) for \(i>N\), so the \((Z_i)_{i\ge 1}\) are independent, \(S=\mathsf{E}\sup_t\sum_i \varepsilon_i Z_i(t)=S(T)\), and \(\varphi_j(s,t) = \int|r^j(s-t)|^2\wedge 1\,d\nu\). Let \(j_0=j_0(T)\) be the integer given by the distance bound of the General Lower Bound, \(\varphi_{j_0}(s,t)\le 4\) on \(T\).
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  For \(t\in T\), \(\int|t|1_{\{2|t|\ge r^{-j_0}\}}\,d\nu \le L\bar S(T) \le LS(T)\).
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof.</span>
  Since \(0\in T\), \(\varphi_{j_0}(0,t)\le 4\) gives \(\int|r^{j_0}t|^2\wedge 1\,d\nu\le 4\). With \(U=\{2|t|\ge r^{-j_0}\}\), \(\nu(U)\le 16\), so \(\sum_{i\le N}\lambda_i(U)\le 16\). Let \(\mathcal A = \{i\ ;\ \lambda_i(U)\ge 1/2\}\), \(\operatorname{card}\mathcal A\le 32\). For \(i\le N\) let \(\Xi_i\) be the event \(X_i\in U\), \(X_j\notin U\) for \(j\ne i\), \(j\notin\mathcal A\). Since \(1-\lambda_j(U)\ge\exp(-2\lambda_j(U))\) for \(j\notin\mathcal A\), \(\mathsf{P}(\Xi_i) \ge \lambda_i(U)/L\). Given \(\Xi_i\), \(X_i\) is distributed as \(\lambda_i\) restricted to \(U\), so
  </p>
\[
\int_U|t|\,d\lambda_i \le L\,\mathsf{E}1_{\Xi_i}|t(X_i)| \le
L\,\mathsf{E}1_{\Xi_i}\Big|\sum_{j\le N}\varepsilon_j t(X_j)\Big|,
\]
  <p>
  by Jensen, averaging the \(\varepsilon_j\), \(j\ne i\), outside the absolute value. Since \(\sum_{i\notin\mathcal A}1_{\Xi_i}\le 1\), \(\sum_{i\le N}1_{\Xi_i}\le 33\), and summing over \(i\le N\), using \(\bar S(T)\le 2S(T)\), gives the lemma.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Proposition.</span>
  \(T\subset T_1+T_2\), \(0\in T_1\), and
  </p>
\[
\gamma_2(T_1,d_2) + \gamma_1(T_1,d_\infty) \le LS(T),
\]
\[
\forall t\in T_2,\qquad \int|t|\,d\nu \le LS(T).
\]
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof.</span>
  Apply the General Lower Bound and then the peaky part decomposition theorem, absorbing what is called \(T_3\) there into \(T_2\). The previous lemma gives the second bound of the proposition.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof of the Decomposition Theorem.</span>
  Combining the first bound of the proposition with the chaining bound \(S(T_1)\le L(\gamma_2(T_1,d_2)+\gamma_1(T_1,d_\infty))\) gives \(S(T_1)\le LS(T)\), so \(\bar S(T_1)\le LS(T)\) since \(0\in T_1\). Replacing \(T_2\) by \(T_2\cap(T-T_1)\), we may assume \(T_2\subset T-T_1\), so \(\bar S(T_2) \le \bar S(T)+\bar S(T_1) \le LS(T)\). With the second bound of the proposition, the Giné&ndash;Zinn theorem gives \(\mathsf{E}\sup_{t\in T_2}\sum_{i\le N}|t(X_i)| \le LS(T)\).
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof of the Fundamental Theorem of Empirical Processes.</span>
  Apply the previous proof with \(\lambda_i=\mu\) independent of \(i\), so \(\nu=N\mu\). Then \(\gamma_2(T_1,d_{2,\nu}) = \sqrt N\gamma_2(T_1, d_{2,\mu})\), giving \(\gamma_2(T_1,d_2) \le LS_N(\mathcal F)/\sqrt N\). The bound on \(\gamma_1(T_1,d_\infty)\) is unchanged. The lemma comparing \(\bar S\) with the signed sum under centering converts the second bound of the proposition into the bound on \(\mathsf{E}\sup_{t\in T_2}\sum_i|t(X_i)|\) stated in the theorem.
  </p>
</div>

<p>
This closes the chain running from the Latała&ndash;Bednorz theorem through the Main Lemma, the majorizing measure, the partitions, the General Lower Bound, and the Giné&ndash;Zinn theorem, to the Fundamental Theorem of Empirical Processes. Chaining against no cancellation, first isolated for linear sums of signs, governs the size of sums of independent random functions in full generality, and the machinery built for the Bernoulli conjecture is the machinery that proves it.
</p>

<p><a href="{{ '/mathematics/' | relative_url }}">&larr; Back to Mathematics</a></p>
