/**
 * Path utility functions to handle resource path differences between
 * local development and GitHub Pages environments
 */

/**
 * Get the public path prefix for resources
 * On GitHub Pages, we need to add the /persona-template01 prefix
 * In local development environment, we can use relative paths
 */
export const getPublicPath = (): string => {
    const isGitHubPages = window.location.hostname.includes('github.io');
    // Also support local testing at /persona-template01
    const isLocalPersonalWebsite = window.location.pathname.startsWith('/persona-template01');
    return isGitHubPages || isLocalPersonalWebsite ? '/persona-template01' : '';
};

/**
 * Add public path prefix to resource paths
 * @param path Original resource path
 * @returns Resource path with public path prefix added
 */
export const getResourcePath = (path: string): string => {
    if (!path || !path.startsWith('/')) {
        return path;
    }
    const prefix = getPublicPath();
    // Avoid double prefix
    if (prefix && path.startsWith(prefix + '/')) {
        return path;
    }
    return `${prefix}${path}`;
};
