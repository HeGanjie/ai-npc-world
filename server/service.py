from langchain.llms import OpenAI
import logging
logging.basicConfig(level=logging.ERROR)

# 需要手动设置环境变量
if __name__ == "__main__":
    llm = OpenAI(model_name="text-davinci-003",max_tokens=1024)
    res = llm("怎么评价人工智能")
    print(res)
