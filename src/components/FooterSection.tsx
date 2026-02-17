const FooterSection = () => {
  return (
    <footer className="relative py-12 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display text-lg text-gradient-gold tracking-wider">
              SIEGE MASTERCLASS: ELO CHAMPION
            </p>
            <p className="font-body text-xs text-muted-foreground mt-1">
              © {new Date().getFullYear()} Siege Masterclass. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
