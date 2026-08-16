import { Prose } from '@/components/Prose'

export const metadata = {
  title: 'About | The Bitcoin Brief',
}

const ABOUT_CONTENT = `# The Bitcoin Brief

> **[T]he market creates, modifies, and recreates the concepts of money. The law simply recognizes the changes, often ex post facto.**

Ali Kahn, *The Evolution of Money: A Story of Constitutional Nullification*, 67 U. Cin. L. Rev. 393, 414 (1999).

---

Welcome to ***The Bitcoin Brief***, a legal research newsletter analyzing Bitcoin from an appellate attorney’s perspective.

There is no dearth of quality crypto-attorneys opining on how legislation and regulation affects cryptocurrencies and other digital assets. I’m not a crypto-attorney, so I won’t attempt to add to those voices here. Instead, this periodical will focus on the inverse: how **Bitcoin** will affect the development and administration of law.

The purpose of this newsletter is two-fold. The first is to educate the legal profession about Bitcoin and its transformative potential for society. The second is to educate Bitcoiners and those without legal backgrounds on important areas of the law that relate to Bitcoin’s usage, adoption, and philosophical underpinnings.

Please feel free to connect with me at aaron@bitcoinbrief.io.

-Aaron`

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <Prose markdown={ABOUT_CONTENT} />
    </div>
  )
}
