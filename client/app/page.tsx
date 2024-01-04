import Intro from '../app/components/intro';
import PageContent from '../app/components/page-contents';

export default function IndexPage() {

  return (
    <main className="p-4 md:p-10 max-w-7xl mx-auto">
      <Intro />
      <PageContent />
    </main >
  );
}
