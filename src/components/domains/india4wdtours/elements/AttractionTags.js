const colorPerTag = {
	"Spirituality": "var(--color-blue-100)",
	"History": "var(--color-red-100)",
	"Nature": "var(--color-green-100)",
	"Village": "var(--color-purple-100)",
	"Wildlife": "var(--color-orange-100)",
	"Culinary": "var(--color-yellow-100)"
};

export default function AttractionTags({ tags, style = {} }) {
	if (!tags?.length) return null;
	return <div className="tags is-flex is-align-items-center" style={style}>
		{tags.map((tag, index) => <a key={index} href={`/attraction/${tag.toLowerCase()}`} className="tag is-rounded me-2" style={{ backgroundColor: colorPerTag[tag] }}>
			{tag}
		</a>)}
	</div>;
}