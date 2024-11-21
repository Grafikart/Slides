const siteName = "MonSite";

export function updateTitle(newTitle: string): void {
  if (!newTitle) {
    document.title = siteName;
    return;
  }
  document.title = `${newTitle} | ${siteName}`;
}
