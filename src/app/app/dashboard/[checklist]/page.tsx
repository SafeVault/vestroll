import type { Metadata, ResolvingMetadata } from 'next'
import NotFound from "@/app/not-found";
import MultiStepForm from "@/components/dashboard/home/checklist/company-info/MultiStepForm";
import CompleteKYBPage from "@/components/dashboard/home/checklist/CompleteKYB";
import { handleChecklistMetadata } from '@/components/dashboard/home/lib';
type Props = {
  params: Promise<{ checklist: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const checklist = (await params).checklist

  // fetch post information (handleChecklistMetadata returns sensible defaults)
  const checklistMeta = handleChecklistMetadata(checklist);

  return {
    title: checklistMeta.title,
    description: checklistMeta.description,
  };
}

export default async function ChecklistPage({ params, searchParams }: Props) {
    const checklist = (await params).checklist;
    // check the checklist param and render accordingly
    const handleContent = () => {
        switch (checklist) {
            case "kyb-verification":
                return <CompleteKYBPage />;
            case "company-info":
                return <MultiStepForm />;
            case "connect-wallet":
                return <div>Connect Wallet Content</div>;
            default:
                return <NotFound />;
        }
    };

    return (
        <div className="p-2">
            {handleContent()}
        </div>
    );
}
