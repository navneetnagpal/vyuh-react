import { RouteBuilder } from '@vyuh/react-extension-content';

export default function Home() {
  return <RouteBuilder url={'/react'} allowRefresh={true} />;
}
