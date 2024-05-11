'use client'
import { useRouter } from 'next/navigation';
import LineArrowLeft from '@/public/line-arrow-left.svg'
import Image from 'next/image'
import Link from 'next/link'


export default function BackArrow() {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    return (
        <div>
            <Link href="#" onClick={goBack}><Image src={LineArrowLeft} alt={''} style={{ layout: '' }} priority={false} /></Link>
            <h1>Project Details</h1>
        </div>
    )
}