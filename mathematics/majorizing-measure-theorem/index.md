---
layout: default
title: Proof of the Majorizing Measure Theorem
permalink: /mathematics/majorizing-measure-theorem/
---

<h1>The Majorizing Measure Theorem</h1>
<p class="tagline">My favorite proof: Talagrand's two-sided bound on the supremum of a Gaussian process.</p>

<p class="lede">
Let \((X_t)_{t \in T}\) be a centered Gaussian process with canonical metric
\(d(s,t) = (\mathbb{E}|X_s - X_t|^2)^{1/2}\). The theorem says the expected supremum of the process is
pinned down, up to a universal constant, by a purely geometric quantity of \((T,d)\): the \(\gamma_2\)
functional. Below is the proof of both directions, upper and lower.
</p>

<h2>Introduction</h2>

<p>
We reproduce, following Talagrand's notation and arguments, the proof of the lower bound
</p>

\[
\gamma_2(T,d) \le L\, \mathsf{E}\sup_{t\in T} X_t
\]

<p>
in the Majorizing Measure Theorem for Gaussian processes. We first introduce admissible sequences of partitions and the functional \(\gamma_\alpha\), then develop the theory of functionals satisfying a growth condition and the partitioning theorem that they yield, and finally combine these with Sudakov's lemma and Borell's inequality to obtain the lower bound.
</p>

<h2>Admissible sequences, functionals, and the growth condition</h2>

<p>
Throughout, \((T,d)\) is a metric space. For an integer \(n\ge 0\) we set
</p>

\[
N_0 = 1 , \qquad N_n = 2^{2^n} \ (n\ge 1).
\]

<div class="math-env">
  <p><span class="math-env-label">Definition (Admissible sequence).</span>
  Given a set \(T\) an admissible sequence is an increasing sequence \((A_n)\) of partitions of \(T\) such that \(\operatorname{card} A_n \le N_n\), i.e. \(\operatorname{card} A_0 = 1\) and \(\operatorname{card} A_n \le 2^{2^n}\) for \(n\ge 1\).
  </p>
</div>

<p>
By an increasing sequence of partitions we mean that every set of \(A_{n+1}\) is contained in a set of \(A_n\). Throughout we denote by \(A_n(t)\) the unique element of \(A_n\) which contains \(t\). The double exponential in the definition of \(N_n\) occurs simply since for our purposes the proper measure of the size of a partition \(A\) is \(\log\operatorname{card} A\). This double exponential ensures that the size of the partition \(A_n\) doubles at every step.
</p>

<div class="math-env">
  <p><span class="math-env-label">Theorem (The generic chaining bound).</span>
  Under the increment condition
  </p>
\[
\forall s,t\in T,\ \forall u>0,\qquad
\mathsf{P}(|X_s-X_t|\ge u) \le 2\exp\!\Big(-\frac{u^2}{2 d(s,t)^2}\Big)
\]
  <p>
  and if \(\mathsf{E}X_t=0\) for each \(t\), then for each admissible sequence \((A_n)\) we have
  </p>
\[
\mathsf{E}\sup_{t\in T} X_t \le L \sup_{t\in T} \sum_{n\ge 0} 2^{n/2}
\mathit{\Delta}(A_n(t)) .
\]
</div>

<p>
Here, as always, \(\mathit{\Delta}(A_n(t))\) denotes the diameter of \(A_n(t)\) for \(d\).
</p>

<div class="math-env">
  <p><span class="math-env-label">Proof.</span>
  We may assume \(T\) to be finite. We construct a subset \(T_n\) of \(T\) by taking exactly one point in each set \(A\) of \(A_n\). Then for \(t\in T\) and \(n\ge 0\) we have \(d(t,T_n)\le \mathit{\Delta}(A_n(t))\) and the result follows from the bound \(\mathsf{E}\sup_{t\in T} X_t \le L\sup_{t\in T}\sum_{n\ge 0} 2^{n/2} d(t,T_n)\), valid for any sets \(T_n\) with \(\operatorname{card} T_n\le N_n\).
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Definition.</span>
  Given \(\alpha>0\), and a metric space \((T,d)\) that need not be finite, we define
  </p>
\[
\gamma_\alpha(T,d) = \inf \sup_{t\in T} \sum_{n\ge 0} 2^{n/\alpha}
\mathit{\Delta}(A_n(t)) ,
\]
  <p>
  where the infimum is taken over all admissible sequences.
  </p>
</div>

<p>
It is useful to observe that since \(A_0(t)=T\) we have \(\gamma_\alpha(T,d)\ge \mathit{\Delta}(T)\). Combining the generic chaining bound with this definition yields the following consequence.
</p>

<div class="math-env">
  <p><span class="math-env-label">Theorem.</span>
  Under the increment condition above and \(\mathsf{E}X_t=0\) we have
  </p>
\[
\mathsf{E}\sup_{t\in T} X_t \le L\gamma_2(T,d).
\]
</div>

<p>
This is the upper bound. Of course, to make this bound of interest we must be able to control \(\gamma_2(T,d)\), so we must learn how to construct admissible sequences.
</p>

<p>
For a Gaussian process \((X_t)_{t\in T}\), i.e. a jointly Gaussian family of centered random variables indexed by \(T\), we provide \(T\) with the canonical distance
</p>

\[
d(s,t) = \big(\mathsf{E}(X_s-X_t)^2\big)^{1/2}.
\]

<div class="math-env">
  <p><span class="math-env-label">Theorem (The Fernique&ndash;Talagrand theorem).</span>
  For some universal constant \(L\) we have
  </p>
\[
\frac{1}{L}\gamma_2(T,d) \le \mathsf{E}\sup_{t\in T} X_t \le L\gamma_2(T,d).
\]
</div>

<p>
The right-hand side inequality follows from the generic chaining bound above, applied to the increment condition satisfied by Gaussian processes. The purpose of these notes is to prove the left-hand side inequality, the lower bound
</p>

\[
\gamma_2(T,d) \le L\, \mathsf{E}\sup_{t\in T} X_t .
\]

<p>
We may summarize this by saying that chaining suffices to explain the size of a Gaussian process. By this we simply mean that, as witnessed by the left-hand side inequality above, the natural chaining bound for the size of a Gaussian process, as witnessed by the right-hand side inequality above, is of correct order, provided of course one uses the best possible chaining.
</p>

<p>
To prove the lower bound one does not attack \(\gamma_2(T,d)\) directly. Instead one develops an abstract machinery, the theory of functionals satisfying a growth condition, which produces an admissible sequence of partitions witnessing that \(\gamma_2(T,d)\) is controlled by any functional dominating \(\mathsf{E}\sup X_t\) that satisfies this growth condition.
</p>

<div class="math-env">
  <p><span class="math-env-label">Definition (Functional).</span>
  We say that a map \(F\) is a functional on a set \(T\) if, to each subset \(H\) of \(T\), it associates a number \(F(H)\ge 0\), and if it is increasing, i.e.
  </p>
\[
H \subset H' \subset T \ \Rightarrow\ F(H) \le F(H').
\]
</div>

<p>
Intuitively a functional is a measure of size for the subsets of \(T\). It allows one to identify which subsets of \(T\) are large for our purposes. Suitable partitions of \(T\) will then be constructed through an exhaustion procedure that selects first the large subsets of \(T\). A first fundamental example of a functional is \(F(H) = \gamma_2(H,d)\). A second, equally important, is the quantity \(F(H) = \mathsf{E}\sup_{t\in H} X_t\) where \((X_t)_{t\in T}\) is a process indexed by \(T\).
</p>

<p>
We now need the notion of well separated small pieces.
</p>

<div class="math-env">
  <p><span class="math-env-label">Definition.</span>
  Given \(a>0\) and an integer \(r\ge 4\) we say that subsets \(H_1,\dots,H_m\) of \(T\) are \((a,r)\)-separated if
  </p>
\[
\forall \ell\le m,\ H_\ell \subset B(t_\ell, a/r),
\]
  <p>
  where the points \(t_1,t_2,\dots,t_m\) in \(T\) satisfy
  </p>
\[
\forall \ell \le m,\ t_\ell \in B(s,ar);\qquad
\forall \ell,\ell'\le m,\ \ell\ne \ell' \Rightarrow d(t_\ell,t_{\ell'}) \ge a
\]
  <p>
  for a certain point \(s\in T\).
  </p>
</div>

<p>
Consider a metric space \((T,d)\) that need not be finite, and a decreasing sequence \((F_n)_{n\ge 0}\) of functionals on \(T\), that is
</p>

\[
\forall H\subset T,\qquad F_{n+1}(H) \le F_n(H).
\]

<div class="math-env">
  <p><span class="math-env-label">Definition (The growth condition).</span>
  We say that the functionals \(F_n\) satisfy the growth condition with parameters \(r\ge 4\) and \(c^*>0\) if for any integer \(n\ge 0\) and any \(a>0\) the following holds true, where \(m=N_{n+1}\). For each collection of subsets \(H_1,\dots,H_m\) of \(T\) that are \((a,r)\)-separated we have
  </p>
\[
F_n\Big(\bigcup_{\ell\le m} H_\ell\Big) \ge c^* a 2^{n/2} + \min_{\ell\le m}
F_{n+1}(H_\ell).
\]
</div>

<p>
We observe that the functional \(F_n\) occurs on the left-hand side of the inequality above, while the smaller functional \(F_{n+1}\) occurs on the right-hand side, which gives us a little extra room to check this condition.
</p>

<p>
The following result explains that decreasing sequences of functionals satisfying the growth condition are built into the definition of \(\gamma_2(T,d)\). It is a converse of the theorem we actually need, but is included because it clarifies the meaning of the growth condition.
</p>

<div class="math-env">
  <p><span class="math-env-label">Theorem.</span>
  For any metric space \((T,d)\) there exists a decreasing sequence of functionals \((F_n)_{n\ge 0}\) with \(F_0(T)=\gamma_2(T,d)\) which satisfies the growth condition above for \(r=4\) and \(c^*=1/2\).
  </p>
</div>

<p>
The result that we actually need is the converse direction. It says that in a sense \(F(H)=\gamma_2(H,d)\) is the smallest functional which satisfies the growth condition.
</p>

<div class="math-env">
  <p><span class="math-env-label">Theorem (Talagrand's partitioning theorem).</span>
  Let \((T,d)\) be a metric space. Assume that there exists a decreasing sequence of functionals \((F_n)_{n\ge 0}\) which satisfies the growth condition above. Then
  </p>
\[
\gamma_2(T,d) \le \frac{Lr}{c^*} F_0(T) + Lr\mathit{\Delta}(T).
\]
</div>

<p>
This theorem and its generalizations form the backbone of the theory. Its essence is that it produces, by actually constructing them, a sequence of partitions that witnesses this inequality.
</p>

<h2>Proof of the lower bound</h2>

<p>
We prove Talagrand's partitioning theorem in the following form, essentially equivalent up to a shift of index, and then apply it to Gaussian processes.
</p>

<div class="math-env">
  <p><span class="math-env-label">Theorem.</span>
  Assume that on the metric space \((T,d)\) there exists a decreasing sequence of functionals \((F_n)_{n\ge 0}\) that satisfies the growth condition. Then we can find an increasing sequence of partitions \((A_n)\) with \(\operatorname{card} A_n \le N_{n+1}\) and
  </p>
\[
\sup_{t\in T} \sum_{n\ge 0} 2^{n/2}\mathit{\Delta}(A_n(t)) \le \frac{Lr}{c^*} F_0(T) +
Lr\mathit{\Delta}(T).
\]
</div>

<p>
This is not exactly the statement above because here we have \(\operatorname{card} A_n \le N_{n+1}\) rather than \(\operatorname{card} A_n \le N_n\), but the earlier form follows by combining this one with the following elementary re-indexing lemma.
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  Consider \(\alpha>0\), an integer \(\tau\ge 0\) and an increasing sequence of partitions \((B_n)_{n\ge 0}\) with \(\operatorname{card} B_n \le N_{n+\tau}\). Let
  </p>
\[
S := \sup_{t\in T} \sum_{n\ge 0} 2^{n/\alpha}\mathit{\Delta}(B_n(t)).
\]
  <p>
  Then we can find an admissible sequence \((A_n)_{n\ge 0}\) such that
  </p>
\[
\sup_{t\in T} \sum_{n\ge 0} 2^{n/\alpha}\mathit{\Delta}(A_n(t)) \le 2^{\tau/\alpha}
\big(S + K(\alpha)\mathit{\Delta}(T)\big).
\]
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof.</span>
  We set \(A_n=\{T\}\) if \(n<\tau\) and \(A_n=B_{n-\tau}\) if \(n\ge \tau\) so that \(\operatorname{card} A_n \le N_n\) and
  </p>
\[
\sum_{n\ge \tau} 2^{n/\alpha}\mathit{\Delta}(A_n(t)) = 2^{\tau/\alpha}
\sum_{n\ge 0} 2^{n/\alpha}\mathit{\Delta}(B_n(t)).
\]
  <p>
  Using the bound \(\mathit{\Delta}(A_n(t))\le\mathit{\Delta}(T)\), we obtain
  </p>
\[
\sum_{n<\tau} 2^{n/\alpha}\mathit{\Delta}(A_n(t)) \le K(\alpha) 2^{\tau/\alpha}
\mathit{\Delta}(T).
\]
</div>

<p>
Replacing \(F_n\) by \(F_n/c^*\) it suffices to consider the case \(c^*=1\), so we assume this condition throughout the remainder of the proof.
</p>

<p>
We construct the increasing sequence \((A_n)\) of partitions by induction, starting of course with \(A_0=\{T\}\). Together with \(C\in A_n\), we will construct a point \(t_{n,C}\) of \(T\), and an integer \(j_n(C)\) in \(\mathbb Z\). We assume
</p>

\[
C \subset B(t_{n,C}, r^{-j_n(C)}),
\]

<p>
so that in particular \(\mathit{\Delta}(C) \le 2r^{-j_n(C)}\). Thus, we may think of \(j_n(C)\) as keeping track of the diameter of \(C\), more precisely a convenient upper bound for it. We do not require that \(t_{n,C}\) belongs to \(C\).
</p>

<p>
To start the construction, we set \(A_0=\{T\}\), and we choose any point \(t_{0,T}\in T\). We then take for \(j_0(T)\) the largest possible integer such that \(T\subset B(t_{0,T}, r^{-j_0(T)})\), so that \(r^{-j_0(T)} \le r\mathit{\Delta}(T)\).
</p>

<p>
Let us now assume that for a certain \(n\ge 0\) we have already constructed the partition \(A_n\) with \(\operatorname{card} A_n\le N_{n+1}\). To construct \(A_{n+1}\) we will split each set of \(A_n\) into at most \(N_{n+1}\) pieces according to the decomposition lemma below. Since \(N_{n+1}^2 \le N_{n+2}\) we will have \(\operatorname{card} A_{n+1} \le N_{n+2}\), and in this manner we will construct the corresponding increasing sequence of partitions \(A_n\). The whole difficulty of the argument lies in the procedure by which we split a given element of \(A_n\) into pieces, and in the information we gather while doing so.
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  Consider a subset \(C\) of \(T\), an integer \(n\ge 0\) and \(j\in\mathbb Z\). Let \(m=N_{n+1}\). Assume that for a certain \(t_C\in T\) we have \(C\subset B(t_C,r^{-j})\). Then we can find \(m'\le m\) and a partition \((A_\ell)_{\ell \le m'}\) such that for each \(\ell\le m'\) we have either
  </p>
\[
\exists t_\ell \in C,\quad A_\ell \subset B(t_\ell, r^{-j-1}),
\]
  <p>
  or else
  </p>
\[
r^{-j-1}2^{n/2-1} + \sup_{t\in A_\ell} F_{n+1}(A_\ell \cap B(t,r^{-j-2}))
\le F_n(C).
\]
</div>

<p>
Thus we split \(C\) into two kinds of pieces. Those for which \(A_\ell\subset B(t_\ell,r^{-j-1})\) for some \(t_\ell\in C\) are of smaller diameter than \(C\) itself. For those for which \(r^{-j-1}2^{n/2-1} + \sup_{t\in A_\ell} F_{n+1}(A_\ell\cap B(t,r^{-j-2})) \le F_n(C)\), we gain some control on the behavior of the functionals \(F_n\). Two noticeable features of this construction are that it is algorithmic, obtained by repeating a basic simple step until \(C\) has been used up, and greedy, in that the basic step maximizes a simple measure of gain.
</p>

<div class="math-env">
  <p><span class="math-env-label">Proof.</span>
  We show that for \(\ell<m'\) the set \(A_\ell\) satisfies \(A_\ell\subset B(t_\ell,r^{-j-1})\) for some \(t_\ell\in C\), and that if \(\ell=m'=m\) the set \(A_{m}\) satisfies \(r^{-j-1}2^{n/2-1}+\sup_{t\in A_m}F_{n+1}(A_m\cap B(t,r^{-j-2}))\le F_n(C)\). To avoid being distracted by secondary issues, let us first assume that \(T\) is finite. By induction over \(1\le \ell\le m=N_{n+1}\) we construct points \(t_\ell\in C\) and sets \(A_\ell\subset C\) as follows.
  </p>
  <p>
  First, we set \(D_0=C\) and we choose \(t_1\) in \(C\) such that
  </p>
\[
F_{n+1}(C\cap B(t_1,r^{-j-2})) = \sup_{t\in C} F_{n+1}(C\cap B(t,r^{-j-2})).
\]
  <p>
  We then set \(A_1 = C\cap B(t_1,r^{-j-1})\). The idea is simply that we take the largest possible piece of \(C\), and it is in this sense that the method is greedy. The reader notices that the radius of the balls in the display above defining \(t_1\) is \(r^{-j-2}\) while it is \(r^{-j-1}\) in the definition of \(A_1\). This is the main idea of the proof. A large piece of \(C\) is a piece of the type \(A_1=C\cap B(t_1,r^{-j-1})\) for which \(F_{n+1}(C\cap B(t_1,r^{-j-2}))\), rather than \(F_{n+1}(A_1)\), is large. This construction is perfectly appropriate in order to use the growth condition, as it naturally creates well separated large pieces, of which \(C\cap B(t_1,r^{-j-2})\) is the first one. The drawback of the construction is that the information we produce skips a level, since it pertains to smaller balls than those we would like, with radius \(r^{-j-2}\) rather than \(r^{-j-1}\), and the key point of the proof will be to show that we can at some stage recover the information about the skipped level.
  </p>
  <p>
  To continue the construction, assume now that \(t_1,\dots,t_\ell\) and \(A_1,\dots,A_\ell\) have already been constructed, and set \(D_\ell = C \setminus \bigcup_{1\le p\le \ell} A_p\). If \(D_\ell=\emptyset\), we set \(m'=\ell\) and the construction stops. Otherwise, we choose \(t_{\ell+1}\) in \(D_\ell\) such that
  </p>
\[
F_{n+1}(D_\ell \cap B(t_{\ell+1},r^{-j-2})) = \sup_{t\in D_\ell}
F_{n+1}(D_\ell\cap B(t,r^{-j-2})).
\]
  <p>
  We set \(A_{\ell+1} = D_\ell\cap B(t_{\ell+1},r^{-j-1})\) and continue in this manner until either we stop or we construct \(D_{m-1} = C \setminus \bigcup_{\ell<m} A_\ell\). If \(D_{m-1}\) is empty, the construction is finished. Otherwise we set \(A_m = D_{m-1}\), so that \(A_1,\dots,A_m\) form a partition of \(C\).
  </p>
  <p>
  If \(\ell<m'\) it is obvious by construction that \(A_\ell\subset B(t_\ell,r^{-j-1})\) for some \(t_\ell\in C\), so that to finish the proof it suffices to show that \(r^{-j-1}2^{n/2-1}+\sup_{t\in A_m}F_{n+1}(A_m\cap B(t,r^{-j-2}))\le F_n(C)\) holds for \(\ell=m\). The proof relies on the growth condition. It actually suffices for the proof that the growth condition holds whenever \(a\) is of the type \(a=r^{-j'-1}\) for a certain \(j'\in\mathbb Z\). Then the defining property of \((a,r)\)-separation rewrites as
  </p>
\[
\forall \ell\le m,\ t_\ell \in B(s,r^{-j});\qquad \forall \ell,\ell'\le m,\
\ell\ne\ell' \Rightarrow d(t_\ell,t_{\ell'}) \ge r^{-j-1},
\]
  <p>
  and the content of the growth condition is that this implies, since \(c^*=1\),
  </p>
\[
\forall \ell\le m,\ H_\ell \subset B(t_\ell, r^{-j-2}) \ \Rightarrow\
F_n\Big(\bigcup_{\ell\le m} H_\ell\Big) \ge r^{-j-1}2^{n/2} + \min_{\ell\le
m} F_{n+1}(H_\ell).
\]
  <p>
  Let us construct a point \(t_m\in A_m=D_{m-1}\) as in the construction of \(t_{\ell+1}\) above, for \(\ell=m-1\). All the points \((t_\ell)_{\ell\le m}\) belong to \(C\subset B(t_C,r^{-j})\). For \(\ell<m\) we have by construction
  </p>
\[
t_{\ell+1} \in D_\ell = C\setminus \bigcup_{1\le p\le \ell} A_p = C
\setminus \bigcup_{1\le p\le\ell} B(t_p,r^{-j-1}),
\]
  <p>
  and therefore \(d(t_{\ell+1},t_p)\ge r^{-j-1}\) for \(p\le \ell\). Consequently these points satisfy the separation condition above for \(s=t_C\), and therefore the growth condition above holds for \(H_\ell = D_{\ell-1}\cap B(t_\ell,r^{-j-2})\), where we recall \(D_0=C\). Since \(H_\ell \subset C\), we obtain
  </p>
\[
F_n(C) \ge F_n\Big(\bigcup_{\ell\le m} H_\ell\Big) \ge r^{-j-1}2^{n/2} +
\min_{\ell\le m} F_{n+1}(H_\ell).
\]
  <p>
  Now, it follows from the choice of \(t_{\ell+1}\) above that for \(1\le \ell\le m-1\)
  </p>
\[
\sup_{t\in D_\ell} F_{n+1}(D_\ell\cap B(t,r^{-j-2})) \le
F_{n+1}(D_\ell\cap B(t_{\ell+1},r^{-j-2})) = F_{n+1}(H_{\ell+1}),
\]
  <p>
  and the choice of \(t_1\) above implies that this is also true when \(\ell=0\). Since the sequence \((D_\ell)\) decreases, this implies that for \(0\le \ell<m\) we have
  </p>
\[
\sup_{t\in D_{m-1}} F_{n+1}(D_{m-1}\cap B(t,r^{-j-2})) \le F_{n+1}(H_{\ell+1})
\]
  <p>
  and therefore
  </p>
\[
\sup_{t\in D_{m-1}} F_{n+1}(D_{m-1}\cap B(t,r^{-j-2})) \le \min_{1\le \ell
\le m} F_{n+1}(H_\ell).
\]
  <p>
  Combining with the bound above we finally obtain, since \(A_m=D_{m-1}\),
  </p>
\[
r^{-j-1}2^{n/2} + \sup_{t\in A_m} F_{n+1}(A_m\cap B(t,r^{-j-2})) \le F_n(C),
\]
  <p>
  and this finishes the proof when \(T\) is finite. When \(T\) need not be finite, we set \(\varepsilon = r^{-j-1}2^{n/2-1}\) and we replace the choice of \(t_{\ell+1}\) above by the weaker requirement
  </p>
\[
F_{n+1}(D_\ell\cap B(t_{\ell+1},r^{-j-2})) \ge \sup_{t\in D_\ell}
F_{n+1}(D_\ell\cap B(t,r^{-j-2})) - \varepsilon,
\]
  <p>
  and rather than the bound above we reach
  </p>
\[
r^{-j-1}2^{n/2} + \sup_{t\in A_m} F_{n+1}(A_m\cap B(t,r^{-j-2})) \le F_n(C) +
\varepsilon.
\]
  <p>
  Recalling the value of \(\varepsilon\) finishes the proof.
  </p>
</div>

<p>
We now continue the construction. We split the set \(C\in A_n\) into at most \(m\) pieces using the decomposition lemma, and we consider one of these pieces \(A\).
</p>

<p>
If \(A=A_\ell\) satisfies \(A_\ell\subset B(t_\ell,r^{-j-1})\) for some \(t_\ell\in C\), we define \(j_{n+1}(A) = j+1 = j_n(C)+1\) and \(t_{n+1,A}=t_\ell\), so that
</p>

\[
A = A_\ell \subset B(t_\ell, r^{-j-1}) = B(t_{n+1,A}, r^{-j_{n+1}(A)}).
\]

<p>
We stress for further use that in that case \(t_{n+1,A} \in C\).
</p>

<p>
If \(A=A_\ell\) satisfies \(r^{-j-1}2^{n/2-1}+\sup_{t\in A_\ell}F_{n+1}(A_\ell \cap B(t,r^{-j-2}))\le F_n(C)\), we define instead \(j_{n+1}(A)=j\, (=j_n(C))\) and \(t_{n+1,A}=t_{n,C}\), so that
</p>

\[
A \subset C \subset B(t_{n,C}, r^{-j_n(C)}) = B(t_{n+1,A}, r^{-j_{n+1}(A)}).
\]

<p>
This completes the construction, and we turn to the proof of the bound stated in the theorem. First we observe that for any \(t\in T\), the bound \(\mathit{\Delta}(C)\le 2r^{-j_n(C)}\) established above implies
</p>

\[
\sum_{n\ge 0} 2^{n/2}\mathit{\Delta}(A_n(t)) \le 2\sum_{n\ge 0} r^{-j_n(A_n(t))}
2^{n/2},
\]

<p>
and our objective is to bound the right-hand side. We fix \(t\in T\) once and for all. It turns out that in the right-hand side of the inequality above only certain terms really contribute, an observation made precise by the next lemma. Its basic idea is simply that the sum of a geometric series is bounded, up to a constant, by either the first or the last term of the series.
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  Consider numbers \((a_n)_{n\ge 0}\), \(a_n\ge 0\), and assume \(\sup_n a_n < \infty\). Consider \(\alpha>1\) and define
  </p>
\[
I = \{k\ge 0 ;\ \forall n\ge 0,\ n\ne k,\ a_n < a_k \alpha^{|k-n|}\}.
\]
  <p>
  Then
  </p>
\[
\sum_{n\ge 0} a_n \le \frac{2\alpha}{\alpha-1} \sum_{k\in I} a_k.
\]
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof.</span>
  Let us write \(n\prec k\) when \(a_k \ge a_n \alpha^{|n-k|}\). This relation is a partial order. If \(n\prec k\) and \(k\prec p\) then \(a_p \ge a_n \alpha^{|p-k|+|k-n|} \ge a_n \alpha^{|p-n|}\), so that \(n\prec p\). Let us observe that the set \(I\) defined above is the set of elements \(k\) of \(\mathbb N\) that are maximal, i.e. \(k\prec k' \Rightarrow k=k'\). Since we assume that the sequence \((a_n)\) is bounded, there cannot exist an increasing sequence for the order \(\prec\). Consequently, for each \(n\in \mathbb N\) there exists \(k\in I\) with \(n\prec k\). Then \(a_n \le a_k \alpha^{-|n-k|}\), and therefore
  </p>
\[
\sum_{n\ge 0} a_n \le \sum_{k\in I} \sum_{n\ge 0} a_k \alpha^{-|k-n|} \le
\frac{2}{1-\alpha^{-1}} \sum_{k\in I} a_k.
\]
</div>

<p>
We go back to the control of the right-hand side of the inequality above. We recall that \(r\ge 4\). To lighten notation we set \(j(n) = j_n(A_n(t))\), and we set \(a_n = r^{-j(n)}2^{n/2}\). This sequence is bounded because either \(j(n)>j(n-1)\) and then \(a(n)\le a(n-1)\), or else \(A_n(t)\) satisfies the functional-drop bound \(r^{-j(n)-1}2^{n/2-1}+\sup_t F_{n+1}(\cdots)\le F_{n-1}(A_{n-1}(t))\), which since \((F_n)\) decreases forces \(a_n\le 4rF_0(T)\). Consider the set \(I\) provided by the lemma above for \(\alpha=\sqrt 2\). We observe the following relation
</p>

\[
k\in I,\ k\ge 1 \ \Rightarrow\ j(k-1)=j(k),\ j(k+1)=j(k)+1.
\]

<p>
Indeed, if \(j(k+1)=j(k)\), then \(a_{k+1}=\sqrt 2\, a_k\), forcing \(k+1\notin I\) by the definition of \(I\) unless \(j(k+1)=j(k)+1\), and if \(j(k-1)=j(k)-1\) then \(a_{k-1} = (r/\sqrt2)a_k \ge 2a_k\), forcing \(k\in I\) only when \(j(k-1)=j(k)\).
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  Consider elements \(1\le k<k'\) of \(I\). Then
  </p>
\[
\frac{1}{4r} a_k \le F_{k-1}(A_{k-1}(t)) - F_{k'+1}(A_{k'+1}(t)).
\]
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof.</span>
  It follows from the basic containment \(C\subset B(t_{n,C},r^{-j_n(C)})\) that if we define \(A^* := A_{k'+1}(t)\) and \(t^* := t_{k'+1,A^*}\) then \(A^* \subset B(t^*, r^{-j(k'+1)})\). Moreover, since \(k'\in I\) we have \(j(k'+1)=j(k')+1\), and as noted we have \(t^*\in A_{k'}(t)\subset A_k(t)\). Also \(j(k')\ge j(k+1)\), and \(j(k+1)=j(k)+1\) since \(k\in I\) and \(k\ge 1\). Consequently \(j(k'+1)\ge j(k)+2\) and therefore
  </p>
\[
A^* \subset A_k(t) \cap B(t^*, r^{-j(k)-2}).
\]
  <p>
  Moreover, since \(k\in I\) and \(k\ge 1\), we have \(j(k-1)=j(k)\). By construction, the functional-drop bound used for \(n=k-1\) and \(C=A_n(t)=A_{k-1}(t)\) implies
  </p>
\[
r^{-j(k)-1}2^{(k-1)/2-1} + \sup_{u\in A_k(t)} F_k(A_k(t)\cap
B(u,r^{-j(k)-2})) \le F_{k-1}(A_{k-1}(t)),
\]
  <p>
  so that since \(r^{-j(k)-1}2^{(k-1)/2-1} \ge a_k/4r\), the inequality above implies
  </p>
\[
\frac{1}{4r} a_k + F_k(A^*) \le F_{k-1}(A_{k-1}(t)).
\]
  <p>
  Since \(k\le k'\) and since the sequence \((F_n)\) decreases, we have \(F_k(A^*)\ge F_{k'+1}(A_{k'+1}(t))\), which combined with the inequality above proves the lemma.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">End of proof of the partitioning theorem.</span>
  Let \(x(n) = F_n(A_n(t))\), so that the previous lemma implies
  </p>
\[
\frac{1}{4r} a_k \le x(k-1) - x(k'+1).
\]
  <p>
  Moreover, since the sequence \((F_n)\) of functionals decreases, and since the sequence of sets \((A_n(t))\) decreases, the sequence \((x(n))\) decreases.
  </p>
  <p>
  Let us assume first that \(I\) is infinite and let us enumerate \(I\) as an increasing sequence \((k_i)_{i\ge 1}\). For \(i\ge 1\) let us define \(y(i) = x(k_i)\), so that the sequence \((y(i))\) decreases since the sequence \((x(n))\) decreases. For \(i\ge 2\) we have \(k_i - 1 \ge k_{i-1}\) so that \(x(k_i-1) \le y(i-1)\). Similarly \(x(k_{i+1}+1) \ge x(k_{i+2}) = y(i+2)\). Since \(k_i\ge 1\), the previous lemma implies
  </p>
\[
\frac{1}{4r} a_{k_i} \le y(i-1) - y(i+2).
\]
  <p>
  Since \(y(i)\le x(0) = F_0(A_0(t)) = F_0(T)\), summation of the inequalities above yields
  </p>
\[
\sum_{i\ge 2} a_{k_i} \le Lr F_0(T).
\]
  <p>
  It only remains to control \(a_{k_1}\). When \(k_1=0\), then \(a_0 = r^{-j_0(T)} \le r\mathit{\Delta}(T)\). Otherwise \(k_1\ge 1\), and then the functional-drop bound above, used for \(k=k_1\), implies \(a_{k_1} \le 4rF_0(T)\). This completes the proof when \(I\) is infinite. Only small changes are required when \(I\) is finite.
  </p>
  <p>
  Combining the summability lemma with the inequality above bounding \(\sum_n 2^{n/2}\mathit{\Delta}(A_n(t))\), the bound \(\sum_{i\ge 2}a_{k_i}\le LrF_0(T)\) just obtained, and the bound on \(a_{k_1}\), gives
  </p>
\[
\sum_{n\ge 0} 2^{n/2}\mathit{\Delta}(A_n(t)) \le 2 \sum_{n \ge 0} a_n \le
\frac{2\alpha}{\alpha - 1}\Big(\sum_{k\in I} a_k\Big) \le Lr F_0(T) +
Lr\mathit{\Delta}(T),
\]
  <p>
  uniformly in \(t\in T\), which is the inequality of the theorem. Talagrand's partitioning theorem follows by combining this with the re-indexing lemma above.
  </p>
</div>

<p>
We can now complete the proof of the Fernique&ndash;Talagrand theorem. Recall that \((X_t)_{t\in T}\) is a Gaussian process and \(d\) is the canonical distance \(d(s,t)=(\mathsf{E}(X_s-X_t)^2)^{1/2}\) introduced above. We must prove
</p>

\[
\gamma_2(T,d) \le L\, \mathsf{E}\sup_{t\in T} X_t.
\]

<div class="math-env">
  <p><span class="math-env-label">Proof of the lower bound.</span>
  To prove the lower bound we will use the partitioning theorem and the functionals
  </p>
\[
F_n(H^*) = F(H^*) = \sup_{H\subset H^*} \mathsf{E}\sup_{t\in H} X_t,
\qquad \text{where } H \text{ is finite},
\]
  <p>
  so that \(F_n\) does not depend on \(n\). To apply the partitioning theorem we need to prove that the functionals \(F_n\) satisfy the growth condition with \(c^*\) a universal constant, and to bound \(\mathit{\Delta}(T)\), which is easy. We strive to give a proof that relies on general principles, and lends itself to generalizations.
  </p>
</div>

<p>
We now assemble the two ingredients needed for this, Sudakov's lemma and Borell's inequality.
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma (Sudakov's lemma).</span>
  Assume that
  </p>
\[
\forall p,q\le m,\ p\ne q \ \Rightarrow\ d(t_p,t_q)\ge a.
\]
  <p>
  Then we have
  </p>
\[
\mathsf{E}\sup_{p\le m} X_{t_p} \ge \frac{a}{L_1}\sqrt{\log m}.
\]
  <p>
  Here and below \(L_1,L_2,\dots\) are specific universal constants.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Lemma (Borell's inequality).</span>
  Consider a Gaussian process \((X_t)_{t\in U}\), where \(U\) is finite, and let \(\sigma = \sup_{t\in U}(\mathsf{E}X_t^2)^{1/2}\). Then for \(u>0\) we have
  </p>
\[
\mathsf{P}\Big(\Big|\sup_{t\in U} X_t - \mathsf{E}\sup_{t\in U} X_t\Big| \ge
u\Big) \le 2\exp\Big(-\frac{u^2}{2\sigma^2}\Big).
\]
</div>

<p>
Let us stress in words what this means. The size of the fluctuations of \(\mathsf{E}\sup_{t \in U} X_t\) is governed by the size of the individual random variables \(X_t\), rather than by the typically much larger quantity \(\mathsf{E}\sup_{t\in U} X_t\).
</p>

<p>
We combine these two facts into the following proposition, which is exactly the growth condition in disguise.
</p>

<div class="math-env">
  <p><span class="math-env-label">Proposition.</span>
  Consider points \((t_\ell)_{\ell\le m}\) of \(T\). Assume that \(d(t_\ell, t_{\ell'})\ge a\) if \(\ell\ne\ell'\). Consider \(\sigma>0\), and for \(\ell\le m\) a finite set \(H_\ell \subset B(t_\ell,\sigma)\). Then if \(H=\bigcup_{\ell\le m} H_\ell\) we have
  </p>
\[
\mathsf{E}\sup_{t\in H} X_t \ge \frac{a}{L_1}\sqrt{\log m} - L_2 \sigma
\sqrt{\log m} + \min_{\ell\le m} \mathsf{E}\sup_{t\in H_\ell} X_t.
\]
  <p>
  When \(\sigma \le a/(2L_1L_2)\), the inequality above implies
  </p>
\[
\mathsf{E}\sup_{t\in H} X_t \ge \frac{a}{2L_1}\sqrt{\log m} + \min_{\ell\le
m} \mathsf{E}\sup_{t\in H_\ell} X_t,
\]
  <p>
  which can be seen as a generalization of Sudakov's lemma.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Proof.</span>
  We can and do assume \(m\ge 2\). For \(\ell\le m\), we consider the random variable
  </p>
\[
Y_\ell = \sup_{t\in H} X_t - X_{t_\ell} = \sup_{t\in H} (X_t - X_{t_\ell}).
\]
  <p>
  We set \(U=H\) and for \(t\in U\) we set \(Z_t = X_t - X_{t_\ell}\). Since \(H\subset B(t_\ell,\sigma)\) we have \(\mathsf{E}Z_t^2 = d(t,t_\ell)^2 \le \sigma^2\) and, for \(u\ge 0\), Borell's inequality used for the process \((Z_t)_{t\in U}\) implies
  </p>
\[
\mathsf{P}(|Y_\ell - \mathsf{E}Y_\ell| \ge u) \le 2\exp\Big(-\frac{u^2}{2
\sigma^2}\Big).
\]
  <p>
  Thus if \(V = \max_{\ell\le m} |Y_\ell - \mathsf{E}Y_\ell|\) then
  </p>
\[
\mathsf{P}(V\ge u) \le 2m\exp\Big(-\frac{u^2}{2\sigma^2}\Big),
\]
  <p>
  and integration of the tail implies \(\mathsf{E}V \le L_2 \sigma \sqrt{\log m}\). Now, for each \(\ell\le m\),
  </p>
\[
Y_\ell \ge \mathsf{E}Y_\ell - V \ge \min_{\ell\le m} \mathsf{E}Y_\ell - V,
\]
  <p>
  and thus
  </p>
\[
\sup_{t\in H} X_t = Y_\ell + X_{t_\ell} \ge X_{t_\ell} + \min_{\ell\le m}
\mathsf{E}Y_\ell - V
\]
  <p>
  so that
  </p>
\[
\sup_{t\in H} X_t \ge \max_{\ell\le m} X_{t_\ell} + \min_{\ell\le m}
\mathsf{E}Y_\ell - V.
\]
  <p>
  We then take expectations and use Sudakov's lemma.
  </p>
</div>

<p>
We may now complete the proof of the lower bound.
</p>

<div class="math-env">
  <p><span class="math-env-label">Proof of the lower bound, continued.</span>
  We fix \(r\ge 2L_1L_2\). To prove the growth condition for the functionals \(F_n\) we simply observe that the second inequality of the proposition implies that the growth condition holds for \(c^* = 1/L\). Indeed, given \((a,r)\)-separated sets \(H_1,\dots,H_m\) with \(m=N_{n+1}\), so that \(\sqrt{\log m} \asymp 2^{n/2}\), each \(H_\ell\) is contained in a ball of radius \(\sigma = a/r \le a/(2L_1L_2)\) around a point \(t_\ell\) with mutual separations \(\ge a\), and the same inequality applied with finite subsets \(H\subset H_\ell\), taking a supremum over finite subsets \(H\subset \bigcup_\ell H_\ell\) on the left, yields exactly the growth condition for the functionals \(F_n(H^*) = \sup_{H\subset H^*} \mathsf{E}\sup_{t\in H} X_t\), where \(H\) is finite.
  </p>
  <p>
  Using the partitioning theorem, it remains only to control the term \(\mathit{\Delta}(T)\). But
  </p>
\[
\mathsf{E}\max(X_{t_1},X_{t_2}) = \mathsf{E}\max(X_{t_1}-X_{t_2},0) =
\frac{1}{\sqrt{2\pi}} d(t_1,t_2),
\]
  <p>
  so that \(\mathit{\Delta}(T) \le \sqrt{2\pi}\, \mathsf{E}\sup_{t\in T} X_t\).
  </p>
  <p>
  Consequently the partitioning theorem gives
  </p>
\[
\gamma_2(T,d) \le \frac{Lr}{c^*} F_0(T) + Lr\mathit{\Delta}(T) \le L\Big(
\mathsf{E}\sup_{t\in T} X_t\Big) + L\Big(\mathsf{E}\sup_{t\in T}
X_t\Big) = L\, \mathsf{E}\sup_{t\in T} X_t,
\]
  <p>
  since \(F_0(T) = \sup_{H\subset T} \mathsf{E}\sup_{t\in H} X_t = \mathsf{E}\sup_{t\in T} X_t\), where \(H\) is finite, the last equality holding by monotone approximation of \(T\) by finite subsets. This is precisely the left-hand side inequality of the Fernique&ndash;Talagrand theorem, completing the proof of the Fernique&ndash;Talagrand theorem.
  </p>
</div>

<p>
Let us retrace the argument once more. Admissible sequences of partitions and the functional \(\gamma_\alpha(T,d)\) are defined first. A functional and the growth condition with parameters \(r\) and \(c^*\) are defined next. Talagrand's partitioning theorem then shows that any decreasing sequence of functionals satisfying the growth condition controls \(\gamma_2(T,d)\) through \(F_0(T)\) and \(\mathit{\Delta}(T)\). This theorem is proved by an explicit greedy construction of an admissible sequence of partitions, resting on the decomposition lemma, together with a summability argument that isolates a sparse well separated subsequence of scales, and a telescoping estimate along that subsequence. For a Gaussian process the functionals \(F(H^*) = \sup_{H\subset H^*} \mathsf{E}\sup_{t\in H} X_t\), with \(H\) finite, satisfy the growth condition, as a consequence of Sudakov's lemma combined with Borell's inequality, assembled in the proposition above. Plugging these functionals into the partitioning theorem, and bounding \(\mathit{\Delta}(T)\) by \(\mathsf{E}\sup_{t\in T} X_t\), yields the lower bound \(\gamma_2(T,d) \le L\,\mathsf{E}\sup_{t\in T} X_t\).
</p>

<p><a href="{{ '/mathematics/' | relative_url }}">&larr; Back to Mathematics</a></p>
