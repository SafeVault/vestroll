export const handleChecklistLayoutTitle = (slug: string) => {
    switch (slug) {
        case "kyb-verification":
            return "KYB Verification";
        case "company-info":
            return "Company information";
        case "connect-wallet":
            return "Fund wallet";
        default:
            return "not-found";
    }
};

// function to handle metadata title based on slug
export const handleChecklistMetadata = (slug: string) => {
    switch (slug) {
        case "kyb-verification":
            return {
                title: "KYB Verification",
                description: "Verify your business details",
            };
        case "company-info":
            return {
                title: "Company Information",
                description: "Provide your company details",
            };
        case "connect-wallet":
            return {
                title: "Connect Wallet",
                description: "Connect your wallet to fund your account",
            };
        default:
            return {
                title: "Not Found",
                description: "The requested page was not found",
            };
    }
};
