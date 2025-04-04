import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  className?: string
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/dashboard" className={`flex items-center ${className}`}>
      <Image src="/logo.svg" alt="Logo" width={150} height={150} />
    </Link>
  )
}

