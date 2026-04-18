import { CreateBookUseCase } from "../CreateBookUseCase";
import { IBookRepository } from "../../../domain/repositories/IBookRepository";

const mockRepo: jest.Mocked<IBookRepository> = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("CreateBookUseCase", () => {
  const useCase = new CreateBookUseCase(mockRepo);

  it("creates a book with valid input", async () => {
    const input = { title: "Clean Code", author: "Martin", category: "Tech" };
    mockRepo.create.mockResolvedValueOnce({
      id: "uuid-1",
      ...input,
      createdAt: new Date(),
    });

    const result = await useCase.execute(input);

    expect(mockRepo.create).toHaveBeenCalledWith(input);
    expect(result.id).toBe("uuid-1");
  });

  it("throws when title is empty", async () => {
    await expect(
      useCase.execute({ title: "  ", author: "A", category: "B" })
    ).rejects.toThrow("O título do livro não pode estar vazio");
  });
});
