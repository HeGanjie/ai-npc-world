from langchain import PromptTemplate, FewShotPromptTemplate
import openai
import os

# read from env of process
openai.api_key = os.environ.get("OPENAI_API_KEY")


def ask(content: str):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": content}]
    )

    ans = response.get("choices")[0].get("message").get("content")
    return ans


class NLUService:
    _instance = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        if self._instance is not None:
            raise RuntimeError("Use 'Singleton.get_instance()' to create a new instance.")
        # 其他初始化代码

        # First, create the list of few shot examples.
        examples = [
            {
                "Context": "李风华 said \"我会选择去找石天泽了解情况。\"",
                "Q": "李风华的动作是什么？",
                "Options": "移动/发言/交易/给予/获取/进食/睡觉/玩耍/工作/学习/休息",
                "A": "移动"
            },
            {
                "Context": "李风华 said \"我会选择去找石天泽了解情况。\"",
                "Q": "这个时间点（11:00）的石天泽大概会在哪里？",
                "Options": "家/工作地点/通勤路上",
                "A": "工作地点"
            },
            {
                "Context": "李风华 said \"我会选择去找石天泽了解情况。\"",
                "Q": "李风华的移动的目的地是哪里？",
                "Options": "李风华家/石天泽家/林静石家/徐天宇家/王思颖家",
                "A": "石天泽家"
            },
        ]

        # Next, we specify the template to format the examples we have provided.
        # We use the `PromptTemplate` class for this.
        example_formatter_template = """
            上下文: {Context}
            问: {Q}
            选项: {Options}
            答: {A}\n
            """
        example_prompt = PromptTemplate(
            input_variables=["Context", "Q", "Options", "A"],
            template=example_formatter_template,
        )

        # Finally, we create the `FewShotPromptTemplate` object.
        self.few_shot_prompt = FewShotPromptTemplate(
            # These are the examples we want to insert into the prompt.
            examples=examples,
            # This is how we want to format the examples when we insert them into the prompt.
            example_prompt=example_prompt,
            # The prefix is some text that goes before the examples in the prompt.
            # Usually, this consists of intructions.
            prefix="请根据上下文选择一个最可能的选项，无需修饰:\n",
            # The suffix is some text that goes after the examples in the prompt.
            # Usually, this is where the user input will go
            suffix="上下文: {Context}\n问: {Q}\n选项: {Options}\n答:",
            # The input variables are the variables that the overall prompt expects.
            input_variables=["Context", "Q", "Options"],
            # The example_separator is the string we will use to join the prefix, examples, and suffix together with.
            example_separator="\n\n",
        )

    def classify_action(self, npc: str, context: str, question: str, options: str):
        # We can now generate a prompt using the `format` method.
        ctx = f"{npc} said \"{context}\""

        prompt = self.few_shot_prompt.format(Context=ctx, Q=question, Options=options)
        ans = ask(content=prompt)

        return ans
