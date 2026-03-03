import MoleculeNoDataBox from "@/components/molecules/no_data_box.molecule";
import { Button } from "@/components/ui/button";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Unauthorizedage() {
    return (
        <div className="flex flex-col min-h-[100vh] max-w-[720px] mx-auto text-center justify-center p-5 lg:py-1">
            <MoleculeNoDataBox title="You have no access to this page" color="red"/>
            <Link href="/">
                <Button><FontAwesomeIcon icon={faHome}/>Back to Home</Button>
            </Link>
        </div>
    )
}
