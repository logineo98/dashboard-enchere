import { Card, DisplayArticleBody } from "../../../components";
import { PageTabs, PageTitle } from "../../../components/commons";

const DisplayArticle = () => {

    return (
        <div className='display-article'>
            <Card>
                <PageTitle title={"Details de l'article"} hideBtns={true} linked={false} hideExporte={true} link={""} />
                <PageTabs />

                <DisplayArticleBody />
            </Card>
        </div>
    )
}

export default DisplayArticle;