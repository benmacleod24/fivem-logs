import CreateTeamDialog from "@/components/modals/create-team";
import MainLayout from "@/components/layout";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<MainLayout>
			<SignInButton>Login</SignInButton>
		</MainLayout>
	);
}
