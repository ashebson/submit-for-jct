import math


def main():
    num = input(" Enter an integer number n (positive or negative):\n")
    try:
        num = int(num)
    except ValueError:
        print("ERROR: Input number is incorrect!")
        return
    print(reverse_num_1(num))
    print(reverse_num_2(num))


def reverse_num_1(num):
    return int(str(num)[::-1])


def reverse_num_2(num):
    get_digit = lambda n, i: str(n // 10**i % 10)
    count = int(abs(math.log10(num)) + 1)
    digits = list(map(get_digit, [num] * count, range(count - 1, -1, -1)))
    return int(''.join(list(reversed(digits))))


if __name__ == "__main__":
    main()
