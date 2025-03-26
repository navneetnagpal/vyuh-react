import { RouteLoader } from '@vyuh/react-extension-content';

export default function Home() {
  // Load the homepage route from CMS
  return <RouteLoader url="/chakra" allowRefresh={true} />;
}
