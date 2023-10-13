const microsoftClarityKey = process.env.GATSBY_MICROSOFT_CLARITY_KEY;

/* eslint-disable */
export default function MicrosoftClarity () {
	if (!microsoftClarityKey) return null;

	return <script type="text/javascript" dangerouslySetInnerHTML={{
		__html: `(function(c,l,a,r,i,t,y){
			c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
			t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
			y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${microsoftClarityKey}");` }} />;
}