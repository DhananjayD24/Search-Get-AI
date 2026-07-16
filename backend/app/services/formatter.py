class ContextFormatter:

    @staticmethod
    def format(docs):

        formatted = []

        for doc in docs:

            page = doc.metadata["page"] + 1

            formatted.append(
                f"""
Page: {page}

{doc.page_content}
"""
            )

        return "\n\n".join(formatted)