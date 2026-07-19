import { redirect } from 'next/navigation';

// Kept as a compatibility route for bookmarks and older campaign links.
export default function StudioRedirect() {
  redirect('/join');
}
