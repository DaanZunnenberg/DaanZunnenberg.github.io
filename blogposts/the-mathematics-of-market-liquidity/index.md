---
layout: default
title: The Mathematics of Market Liquidity
permalink: /blogposts/the-mathematics-of-market-liquidity/
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/volatility/quant_finance.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Blogpost &middot; Market Microstructure</div>
    <h1 class="hero-name">The Mathematics of Market Liquidity</h1>
    <p class="hero-lede">Market making is a solved problem. That does not mean you can win at it.</p>
  </div>
</section>

<div class="article-body">

<p class="tagline">By Daan Zunnenberg and Nicos Starreveld</p>

<h2 id="what-is-market-making">What is market making?</h2>

<p>
A market maker quotes a price to buy and a price to sell. She does this at the same time, all day. One standard definition describes making a market as &ldquo;continuous buying and selling of shares in particular companies at particular prices.&rdquo; Exchanges themselves describe a market maker as a party that &ldquo;stands ready to buy and sell stock on a regular and continuous basis at a publicly quoted price.&rdquo; The job has two goals. Keep the market liquid and make money doing it.
</p>

<p>
The public image of the job is worse than the job itself. Market makers get lumped in with high-frequency traders in general, and high-frequency trading gets treated in the press as a euphemism for skimming money off ordinary investors. That reputation is mostly earned by a few narrow, largely illegal practices, spoofing and layering among them, not by market making itself. The service a market maker actually sells is the opposite of extraction. Without someone willing to quote a firm buy and sell price at every moment, a trader who wants to sell a stock right now has to wait for another trader who happens to want to buy it right now. Market makers absorb that mismatch and charge the spread for the privilege of not waiting. Every buyer of a mutual fund, every seller of a bond, every pension fund rebalancing a portfolio benefits from that liquidity, usually without knowing whose quotes they just traded against. The empirical record backs this up: since electronic and high-frequency market making displaced the old floor-based specialist system, studies of algorithmic trading and liquidity consistently find that bid-ask spreads have fallen and markets have become measurably easier to trade in, not harder. The job is a genuine public good, priced through the spread rather than through a subscription or a fee.
</p>

<p>
That definition sounds simple enough. A market maker just posts buy and sell prices. But it leaves out the real story. Why does a task this simple attract the brightest minds on Earth, and why does so much money pour into it every year? How do you set the price? How far from fair value do you go? What happens when your position starts growing? Prices move thousands of times every second, so gut feeling will ruin you.<sup>1</sup> This is not a guessing game. It is a control problem.
</p>

<p>
Around fifteen years ago, this problem got a real mathematical answer. In 2008, Marco Avellaneda and Sasha Stoikov modelled market making as a stochastic control problem. That is just a name for a decision problem where you pick your actions over time, while random events keep happening around you. Here, the decision is which bid and ask prices to post, and the random events are which orders arrive and when. The goal is to manage risk from holding a position, called inventory risk, under this randomness. Olivier Gu&eacute;ant and coauthors later pushed the idea further and made it solvable in practice. Their work turned the market maker from someone who posts prices by feel into someone who solves an optimization problem.
</p>

<p>
This newsletter walks through that model. It shows why the model is mathematically optimal. Then it explains why almost nobody outside a handful of firms can trade it profitably.
</p>

<h2 id="the-avellaneda-stoikov-model">The Avellaneda&ndash;Stoikov model</h2>

<p>
Here is the setup. A market maker posts a bid and an ask around a reference price, meaning the theoretical fair value of the asset at that instant. When another trader hits one of those quotes, a trade happens. The goal is to earn the spread between bid and ask. At the same time, she must avoid letting her position build up too far in one direction. After all, because she only quotes passively, every trade she gets filled on is, by construction, one the other side wanted to make.
</p>

<p>
Model the reference price \((S_t)_{t\geq 0}\) as a diffusion, meaning a process whose path is continuous in time but whose direction at any given instant is unpredictable, with no drift pulling it one way or the other, so that it evolves as
</p>

<p>
\[
S_0=S, \qquad dS_t=\sigma\,dW_t.
\]
</p>

<p>
Here \(\sigma\) is the volatility of the asset, and \(W_t\) is a Brownian motion, the canonical mathematical object for pure, driftless randomness. The market maker cannot move \(S_t\). She only chooses how far to place her bid and ask, \(\delta_t^b\) and \(\delta_t^a\), away from it. Nobody actually sees \(S_t\) directly. It is a theoretical fair value, not a price anyone quotes.
</p>

<p>
Orders arrive at random. The standard assumption is that buy and sell orders hit the book as Poisson processes, meaning arrivals occur independently at a known average rate, with no way to predict the exact timing of the next one. The further you quote from \(S_t\), the less likely you are to get hit. Write \(N_t^b\) and \(N_t^a\) for the number of executed buy and sell trades. Inventory, the market maker's current position, is then \(q_t=N_t^b-N_t^a\). Gu&eacute;ant, Lehalle and Fernandez-Tapia proposed the following arrival rates, called intensities,
</p>

<p>
\[
\lambda^b(\delta_t^b)=A e^{-k\delta_t^b},
\qquad
\lambda^a(\delta_t^a)=A e^{-k\delta_t^a},
\]
</p>

<p>
where \(A\) and \(k\) are constants describing how liquid the market is. Quote closer to fair value and you get filled more often. Quote further away and you get filled less often, but you earn more per trade.
</p>

<p>
Cash evolves as
</p>

<p>
\[
dX_t=(S_t+\delta_t^a)dN_t^a-(S_t-\delta_t^b)dN_t^b.
\]
</p>

<p>
The market maker picks \((\delta_t^b,\delta_t^a)\) to get the most out of her terminal wealth, usually under exponential utility. Exponential utility is a standard way to describe a decision maker who dislikes risk, controlled by a risk aversion parameter \(\gamma\geq 0\). A higher \(\gamma\) means she cares more about avoiding a bad outcome than about chasing an extra bit of profit. Wealth alone is not the goal here. A market maker sitting on a huge one-sided position is not doing her job well, even if she is up on paper.
</p>

<p>
Here is the payoff of the model. It can actually be solved. Avellaneda and Stoikov show that, after a standard approximation, the optimal quotes have a clean approximate closed form,
</p>

<p>
\[
\delta_t^{b*}\cong\frac{1}{\gamma}\log\Big(1+\frac{\gamma}{k}\Big)+\frac{1+2q}{2}\gamma\sigma^2(T-t)
\]
</p>

<p>
and
</p>

<p>
\[
\delta_t^{a*}\cong\frac{1}{\gamma}\log\Big(1+\frac{\gamma}{k}\Big)+\frac{1-2q}{2}\gamma\sigma^2(T-t).
\]
</p>

<p>
The inventory term comes from what is called the reservation price, \(r(s,q,t)=s-q\gamma\sigma^2(T-t)\). This is the fair price adjusted for the market maker's own position. Under exponential utility, it is variance, not volatility, that prices risk. A formula with a bare \(\sigma\) is not just ugly. It is dimensionally wrong, and it is a mistake that shows up surprisingly often in second-hand write-ups of this model. Code that up with the wrong power and your skew, meaning how far you tilt your quotes based on your position, is off by a factor of \(\sigma\). That is a real, book-losing bug, not a typo.
</p>

<p>
Read these term by term. The first piece is a baseline spread. It compensates for the risk of holding inventory at all. The second piece adjusts for the current position \(q\). If you are long, you shade both quotes down to encourage selling, and vice versa. As the terminal time \(T\) approaches, this adjustment gets stronger. The model wants you flat by the close.
</p>

<p>
Digital asset markets never close, so an infinite horizon version is more useful there. That just means there is no fixed end time \(T\), only an ongoing steady state. This matters more for digital assets than the name suggests. A token often trades on dozens of venues at once, each with its own order book, its own liquidity, and its own price at any given instant. There is no single closing bell forcing every desk back to flat, and no single exchange whose reference price is obviously the right one to quote against. Gu&eacute;ant and coauthors derive the approximate stationary quotes, meaning the quotes settle into a fixed shape that no longer depends on time,
</p>

<p>
\[
\delta_\infty^{a*}\cong \frac{1}{\gamma}\log\Big(1+\frac{\gamma}{k}\Big)+\frac{1+2q}{2}\sqrt{\frac{\gamma\sigma^2}{2kA}\Big(1+\frac{\gamma}{k}\Big)^{1+\frac{k}{\gamma}}}
\]
</p>

<p>
and
</p>

<p>
\[
\delta_\infty^{b*}\cong \frac{1}{\gamma}\log\Big(1+\frac{\gamma}{k}\Big)+\frac{1-2q}{2}\sqrt{\frac{\gamma\sigma^2}{2kA}\Big(1+\frac{\gamma}{k}\Big)^{1+\frac{k}{\gamma}}}.
\]
</p>

<p>
Adding the two gives the stationary spread,
</p>

<p>
\[
\psi_\infty^*(q)\cong
\frac{2}{\gamma}\log\Big(1+\frac{\gamma}{k}\Big)
+\sqrt{\frac{\gamma\sigma^2}{2kA}\Big(1+\frac{\gamma}{k}\Big)^{1+\frac{k}{\gamma}}},
\]
</p>

<p>
a number depending only on risk aversion \(\gamma\), volatility \(\sigma\), and the liquidity parameters \(A\) and \(k\).
</p>

<p>
One prediction stands out. Higher volatility means wider spreads. This is intuitive once you see it. A bigger \(\sigma\) means bigger swings in inventory risk. So the model tells you to demand more compensation before you take the other side of a trade. Risk goes up, so the price of providing liquidity goes up too. That is the theory, in closed form, and it is optimal given the model's assumptions.
</p>

<p>
One honest caveat, straight from the practitioner's side of the desk. Nobody at a real market making firm trades these closed-form formulas directly. They are approximate solutions to a Hamilton-Jacobi-Bellman equation, the general mathematical equation behind this kind of control problem, and they only hold when \(\gamma\) and the horizon are small. On a real desk, the actual equation gets solved numerically instead, or the whole quoting policy is learned with reinforcement learning against a simulated order book. What survives from Avellaneda and Stoikov is the intuition. Skew your quotes with inventory. Widen with volatility. Tighten with liquidity. That intuition is real, and it is used everywhere. The formula itself is closer to a training exercise than a production system.
</p>

<p>
There is also a second, quieter assumption worth flagging. \(S_t\) here is a stylized diffusion, treated as given. In practice, that reference price is not observed. It is estimated, continuously, from the order book, from correlated instruments, from the market maker's own recent fills. Building a good estimate of fair value is its own hard statistical problem. On most desks, it is a bigger source of edge than the inventory control layer sitting on top of it. The model in this section answers the question of how to skew given fair value. It does not answer what fair value actually is. Treating the two as one problem is the single most common mistake made by people learning this model from a textbook.
</p>

<h2 id="why-the-theory-does-not-survive-contact-with-real-markets">Why the theory does not survive contact with real markets</h2>

<p>
So the model is solved, and the solution is elegant. The problem is that solving the optimal control problem and making money are two different things. The model is a clean idealization. Real markets are not clean. The gap between the two is exactly where the typical retail trader loses.
</p>

<p>
Start with the structural mismatches. The model assumes you can quote at any price. Real exchanges trade on a fixed grid, called the tick size, the smallest allowed gap between two prices. When the model's optimal spread is close to one tick, the whole problem changes character. Tiny parameter changes flip your optimal quote to a different tick entirely. The clean, smooth maths becomes a jumpy one.
</p>

<p>
There is a second mismatch, and it matters just as much. Execution is not just about price. Real order books run on price-time priority. This means that if you and a competitor quote the same price, whoever got there first gets filled first. The model treats execution as a function of price distance alone. It ignores this queue position, which in practice can matter more than price.
</p>

<p>
Some models patch these gaps. Fabien Guilbaud and Huy&ecirc;n Pham, for instance, treat the spread as a finite state Markov chain, a model that jumps between a limited set of discrete states, to build in tick discreteness directly. This comes at a cost though. Every layer of realism added makes the model harder to solve in closed form. The clean split between price risk and execution risk starts to blur.
</p>

<p>
Ticks and queues are the easy problems though. The deeper issue is that the model assumes order flow is random, independent, and stable over time. Real order flow is none of these things. It clusters. It shifts with the time of day. Most importantly, it is not neutral. It is strategic.
</p>

<p>
You are not trading against a random number generator. You are trading against other people. Some of them see things faster than you, or know things you do not. Informed traders hit your quotes exactly when your price is about to look wrong. This is called adverse selection. A fill is not just a fill. It is often a signal that you just took the losing side of a trade.
</p>

<p>
So the real problem is not just quoting optimally given a known level of risk. It is figuring out what is actually happening in the market right now, with only partial information, and reacting before your quotes go stale. That means inferring the volatility regime, the direction of pressure, and how aggressive your competitors currently are. None of that is directly observable. None of it is in the closed-form solution above.
</p>

<p>
On top of that, you are not the only one running this playbook. Many firms run some version of the same model. Every quote you post changes the order book, which changes the fill probabilities for everyone, including you. Market making is not one trader against nature. It is many traders against each other, all reacting to each other in real time.
</p>

<p>
This is sharpest in derivatives markets, where contracts are complex and competition is brutal. There, staying profitable is not about knowing the Avellaneda&ndash;Stoikov formula. It is about who has the better volatility estimate, the better short term flow prediction, and perhaps most importantly, the lower latency. The formula gives you a starting point. Everyone already knows the formula. The edge lives somewhere else.
</p>

<h2 id="why-the-typical-trader-still-loses">Why the typical trader still loses</h2>

<p>
It is tempting to read the last section as follows. Pick a quiet market, and the theory works fine. There is some truth to that. A thin, slow moving market has less adverse selection and fewer competitors, so the model's assumptions are less obviously wrong. But quiet markets are quiet precisely because the big players have not bothered to compete there yet. The moment real money shows up, the same forces reappear.
</p>

<p>
The deeper reason the typical trader cannot just run this model and collect the spread is not competence. It is structure. It shows up in four places, and none of them are fixed by knowing the math better.
</p>

<p>
The first is the flow itself. As discussed above, the counterparties on the other side of your quotes are not random. Professional market makers build entire teams to detect and avoid trading against informed flow. A retail trader has no such filter, and gets picked off by exactly the trades that matter most.
</p>

<p>
The second is infrastructure. Solving the closed-form spread above on paper takes a page. Running it live means a market data feed, a matching engine connection, and a risk system, all fast enough to update quotes before the market moves past them. Retail brokerage connections are not built for this.
</p>

<p>
The third is queue position, and who gets to buy it. Price-time priority means the trader whose order sits first in the queue gets filled first. Firms that pay for colocation, meaning servers physically inside the exchange's data centre, get their orders into the queue microseconds ahead of everyone else. That is not a modeling edge. It is a real estate purchase, and it is not for sale to a retail account. Digital asset markets have their own version of this same problem. On a decentralized exchange, there is no physical queue to buy space in. Instead, priority is bought through gas fees and what is called maximal extractable value, meaning a validator or a bot pays more to get its transaction processed first, or reorders transactions in the block for its own benefit. The mechanism looks different from colocation, but the outcome is the same. Speed and money still buy priority, and a retail quoting bot still sits at the back of the line.
</p>

<p>
The fourth is the signal itself getting gamed. Outright manipulation, such as spoofing and layering, is illegal and heavily policed, with the U.S. Securities and Exchange Commission among the regulators that actively pursue it. So do not overstate how much of it happens to a legitimate quoting bot. The real issue is subtler. Order book signals that look predictive in a backtest, like short bursts of quote activity or apparent imbalance, are actively produced and consumed by sophisticated participants faster than a small bot can tell noise from information. You do not need to be manipulated to lose. You only need to be reacting to a signal that someone faster already traded on.
</p>

<p>
None of this means the math is wrong. It means the math describes the best you could do if you were the only trader in the market. You are not. Each of these four forces widens the gap between the theoretical spread and what a small, slow, unprotected trader can actually capture. That gap is where the theoretical edge disappears before it reaches your account.
</p>

<h2 id="conclusion">Conclusion</h2>

<p>
The Avellaneda&ndash;Stoikov model answers a real question. Given inventory risk and random order flow, what is the optimal quote? The answer is explicit, elegant, and correct, on its own terms.
</p>

<p>
But being optimal given the model and being profitable in the market are not the same claim. Adverse selection, tick discreteness, queue priority, competition, infrastructure cost, and signal gaming all sit between the formula and the actual profit and loss. For a large firm with colocated servers and a surveillance team, that gap can be closed. For the typical trader, it mostly cannot.
</p>

<p>
Market making is not just a stochastic control problem. It is a stochastic control problem wrapped inside a race. The race is rigged in favour of whoever already has the fastest server and the best information. The math tells you what optimal looks like. It does not hand you a way to get there.
</p>

<hr>

<p class="footnote"><sup>1</sup> Look at quote stuffing to see how fast this gets. Single firms send and cancel 60,000 orders in one second to flood the public order book.</p>

</div>

<p><a href="{{ '/blogposts/' | relative_url }}">&larr; Back to Blogposts</a></p>
