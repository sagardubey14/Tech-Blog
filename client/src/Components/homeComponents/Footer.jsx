
const Footer = () => {
  return (
    <footer className=" bg-darkBlue text-lightGrey p-4 text-center inset-x-0 bottom-0">
      <div className="space-x-4">
        <a href="#" className="hover:underline hover:text-gold">Privacy Policy</a>
        <a href="#" className="hover:underline hover:text-gold">Terms of Service</a>
      </div>
      <div className="mt-4">
        <p>Contact : sagardubey353@gmail.com</p>
      </div>
      <div className="mt-4">
        <a href="#" className="hover:underline hover:text-gold">Twitter</a> | <a href="#" className="hover:underline hover:text-gold">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
