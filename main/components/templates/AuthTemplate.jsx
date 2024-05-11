'use client'
import IllustrationPanel from '../organisms/IllustrationPanel';
import LaptopIllustrationTwo from '../../public/laptop-illustration_2x.png'
import LaptopIllustrationChartTwo from '../../public/laptop-chart-illustration_2x.png'
export default function AuthTemplate({ children }) {

    return (
        <section className="registration">
            <IllustrationPanel image={LaptopIllustrationTwo} />
            {children}
        </section>
    )
}