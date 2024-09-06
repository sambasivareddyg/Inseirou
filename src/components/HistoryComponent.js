import '../App.css'

function HistoryComponent() {
  return (
<div className="container history">
            <div className="row">
                <div className="col-lg-8">
                    <h2 className="pb-4 mb-4 fst-italic">
                        Our History
                    </h2>
                    <p>
                        For many years, <b>Bethany</b> has been baking the most delicious pies at her home. In 2013, we
                        opened our first
                        store in Brussels (Belgium) in a cosy little street near the Grand Market. People from all over
                        the
                        world fell
                        in love
                        with the soft cakes, heavenly cheese cakes, spicy apple pies... <i>The store became a success in
                            no
                            time.</i>
                        In 2015, no less than 100 pies were sold every day and Bethany's Pie Shop moved into a
                        larger
                        building.
                        After receiving many requests, it became clear that our next step was making it possible to
                        order
                        pies from the
                        comfort of your own home and from anywhere in the world. You are now looking at the result of
                        this:
                        our very own
                        webstore, making it possible to order Bethany's delicious pies whenever you feel like it!
                    </p>
                    <p>
                        Bethany is famous for using only the best ingredients. This way, we can make sure
                        that our pies are absolutely the best.
                    </p>
                </div>

                <aside className="col-lg-4">
                    <div className="p-4 mb-3 mt-2 bg-light rounded">
                        <h4>A quote from Bethany</h4>
                        <p className="mb-0 fst-italic">My recipes have been in our family for generations. We hope you enjoy
                            our pies! -
                            Bethany</p>
                    </div>

                    <div className="p-4 mb-3 bg-secondary rounded">
                        <h4 className="text-white">Contact us</h4>
                        <p className="mb-0 text-white rfs-text">Send us your questions via info@bethanyspieshop.com</p>
                    </div>

                </aside>
            </div>
        </div>

);
}
export default HistoryComponent;