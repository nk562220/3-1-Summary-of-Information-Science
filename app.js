// Default Reflection Templates
const defaultReflections = {
    "2주차": "우선순위 큐를 위해 단방향 연결 리스트(Linked List)와 리스트 배열 기반 힙(Heap) 구조를 모두 직접 설계했습니다.\n특히 배열 최소 힙을 구성할 때 인덱스 부모(p = (child-1)//2) 및 자식(c = p*2+1) 관계를 완전 이진 트리 규칙에 따라 조정하는 heapify_up, heapify_down 재정렬 로직을 명확히 구현했습니다. 최종적으로 해당 자료구조가 다익스트라 최단 경로 연산 시 탐색 성능을 O(V^2)에서 O(E log V)로 획기적으로 낮출 수 있음을 검증했습니다.",
    "3주차": "해시 테이블의 8가지 대표적인 기법인 Folding, NFolding, Chaining, BST Chaining, Linear Probing, Quadratic Probing, Double Hashing 및 나눗셈법을 직접 설계했습니다.\n각각의 기법들을 모듈화한 뒤, 전체 검증 코드를 구성하여 대량의 키 삽입/삭제 시 발생하는 충돌(Collision) 횟수를 비교 분석했습니다. 선형 조사법의 군집(Clustering) 현상을 극복하기 위해 이차 조사나 이중 해싱을 사용하고, 체이닝 성능을 극대화하기 위해 연결 리스트를 BST 구조로 고도화하는 과정을 배웠습니다.",
    "4주차": "문자열 탐색 단원에서는 브루트 포스, 라빈-카프, KMP, 보이어-무어 매칭을 깊이있게 이해하고, '최장 공통 부분 문자열(Longest Common Substring)'을 구현했습니다.\n단순 비교 시 O(N*M)의 극심한 부하가 걸리는 문제를 라빈-카프의 롤링 해시(Rolling Hash) 및 이진 탐색(Binary Search) 범위를 활용해 O(N log N) 수준으로 크게 최적화시켰습니다. 모듈값 q와 소수의 선정이 충돌에 미치는 영향을 직접 체감할 수 있었습니다.",
    "5주차": "알고리즘 설계의 기초인 시간복잡도를 파악하고, 격자 내 8방향 '섬의 개수 세기' 알고리즘을 DFS/BFS 탐색 방식으로 구축했습니다.\n상하좌우 및 대각선 탐색 처리를 위해 dx, dy 오프셋 배열을 선언하고 방문 플래그(visited)를 업데이트하여 무한 루프를 방지하고 연산량을 O(R * C)로 제어했습니다. 여러 기본 알고리즘의 빅오 표기법 유도 과정을 통해 성능 예측 모델을 세우는 능력을 길렀습니다.",
    "6주차": "최소 신장 트리(MST)를 구축하는 크루스칼 알고리즘 및 Union-Find 자료구조를 적용하여 '도시 분할 계획' 문제를 완수했습니다.\n또한 그리디 전략을 요구하는 '큰 수 만들기' 문제를 스택(Stack) 구조로 결합하여 시간 복잡도 O(N)으로 해결했습니다. 매 순간 스택 탑의 값과 현재 값을 비교해 작은 값을 제거함으로써 최종 최적의 조합을 확보하는 그리디 속성(Greedy Choice Property)을 명확히 익혔습니다.",
    "7주차": "이진 탐색(Binary Search) 알고리즘을 반복적(Iterative) 방식과 재귀적(Recursive) 분할 정복 방식으로 두 가지 모두 견고히 구현했습니다.\n더불어 정규표현식 및 파싱 필터를 적용해 수식 문자열(괄호 짝 및 연산자 정합성)의 완전한 올바름을 사전 테스트하는 수식 무결성 검증 로직을 구축하며, 분할 정복을 실제 도메인 논리에 융합하는 설계력을 기를 수 있었습니다.",
    "8주차": "동적 계획법을 활용해 두 문자열 간의 '최장 공통 부분 수열(LCS)'의 길이를 DP 이차원 행렬 형태로 계산하고, 역추적(Backtracking)을 통해 구체적인 LCS 문자열 값을 복원했습니다.\n또한 '최대 서브 배열 합' 문제를 풀기 위해 분할정복과 점화식 메모이제이션(카데인 알고리즘, O(N)) 성능 차이를 정밀 관측하고 대용량 데이터에서 동적 계획법의 강력한 유용성을 실증했습니다.",
    "9주차": "백트래킹을 다루는 미로 탈출(Maze) 및 N-Queens, 순열 생성에 대한 탐색 코드를 구현했습니다.\n상태 공간 트리(State Space Tree)의 루트에서 유망하지 않은 분기(Non-promising)를 조기에 잘라내는(Pruning) DFS 기반 백트래킹을 실행하고, 미로 및 트리의 탐색 과정을 SVG 벡터 이미지 데이터로 직접 인코딩하여 HTML 상에 렌더링함으로써 시각적으로 흐름을 명쾌하게 추적했습니다."
};

let courseData = [];
let currentWeekIndex = 0;

// Initialize Web App
document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            courseData = data;
            initializeUI();
        })
        .catch(err => {
            console.error("데이터 로드 실패:", err);
            // Fallback empty data structures if needed
        });
});

function initializeUI() {
    // Render Statistics
    document.getElementById("total-weeks").innerText = courseData.length;
    
    let totalTasks = 0;
    let solvedCount = 0;
    courseData.forEach(week => {
        totalTasks += week.items.length;
        solvedCount += week.items.filter(item => item.is_my_code).length;
    });
    
    document.getElementById("total-tasks").innerText = totalTasks;
    document.getElementById("my-solved-count").innerText = solvedCount;

    // Render Navigation Menu
    const menuContainer = document.getElementById("weeks-menu");
    menuContainer.innerHTML = "";
    
    courseData.forEach((week, index) => {
        const btn = document.createElement("button");
        btn.classList.add("nav-item");
        if (index === 0) btn.classList.add("active");
        
        btn.innerHTML = `
            <span class="nav-week">${week.week}</span>
            <span class="nav-topic">${week.week.replace("주차", "")}: ${week.topic.split(" (")[0]}</span>
        `;
        
        btn.addEventListener("click", () => {
            document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
            btn.classList.add("active");
            selectWeek(index);
        });
        
        menuContainer.appendChild(btn);
    });

    // Setup Save Reflection Listener
    const saveBtn = document.getElementById("save-reflection-btn");
    saveBtn.addEventListener("click", saveReflection);

    // Initial Load
    selectWeek(0);
}

function selectWeek(index) {
    currentWeekIndex = index;
    const weekData = courseData[index];
    
    // Update Week Tag & Topic Title
    document.getElementById("current-week-tag").innerText = weekData.week;
    document.getElementById("current-topic-title").innerText = weekData.topic;
    document.getElementById("current-topic-desc").innerText = weekData.description;

    // Update File Links
    const pdfLink = document.getElementById("pdf-link");
    const ipynbLink = document.getElementById("ipynb-link");

    pdfLink.href = encodeURIComponent(weekData.pdf_name);
    ipynbLink.href = encodeURIComponent(weekData.ipynb_name);

    // Load Reflection from LocalStorage or Fallback to Default Template
    const storageKey = `reflection_${weekData.week}`;
    let savedReflection = localStorage.getItem(storageKey);
    if (!savedReflection) {
        savedReflection = defaultReflections[weekData.week] || "";
    }
    document.getElementById("reflection-text").value = savedReflection;

    // Load Exercises / Code blocks
    const container = document.getElementById("exercises-container");
    container.innerHTML = "";

    weekData.items.forEach((item, exIdx) => {
        const card = document.createElement("div");
        card.classList.add("detail-card", "glass-card", "ex-card", "fade-in");

        let badgeHtml = "";
        if (item.is_my_code) {
            badgeHtml = `<span class="my-badge"><i class="fa-solid fa-user-check"></i> 내가 푼 문제</span>`;
        }

        const escapedCode = escapeHtml(item.code);

        card.innerHTML = `
            <div class="ex-header">
                <div class="ex-title-box">
                    <span class="ex-index">${exIdx + 1}</span>
                    <h4 class="ex-title">${item.title}</h4>
                </div>
                ${badgeHtml}
            </div>
            <p class="ex-desc">${item.description}</p>
            <div class="code-container">
                <div class="code-header">
                    <div class="terminal-dots">
                        <span class="dot red"></span>
                        <span class="dot yellow"></span>
                        <span class="dot green"></span>
                    </div>
                    <span class="code-lang-label">python</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa-regular fa-copy"></i> Copy</button>
                </div>
                <pre><code class="language-python">${escapedCode}</code></pre>
            </div>
        `;
        container.appendChild(card);
    });

    // Trigger Prism Highlight
    Prism.highlightAll();

    // Trigger animate intro cards
    const introCard = document.getElementById("week-intro-card");
    introCard.classList.remove("fade-in");
    void introCard.offsetWidth; // Trigger reflow
    introCard.classList.add("fade-in");
}

function saveReflection() {
    const weekData = courseData[currentWeekIndex];
    const textValue = document.getElementById("reflection-text").value;
    const storageKey = `reflection_${weekData.week}`;
    
    localStorage.setItem(storageKey, textValue);
    
    // Show Status Toast
    const statusMsg = document.getElementById("save-status-msg");
    statusMsg.innerText = "로컬 저장 완료!";
    statusMsg.classList.add("show");
    
    setTimeout(() => {
        statusMsg.classList.remove("show");
    }, 2000);
}

function copyCode(btn) {
    const pre = btn.closest(".code-container").querySelector("pre");
    const codeText = pre.innerText;
    
    navigator.clipboard.writeText(codeText).then(() => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-green)"></i> Copied!`;
        btn.style.borderColor = "var(--accent-green)";
        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.style.borderColor = "var(--border-glass)";
        }, 1500);
    }).catch(err => {
        console.error("복사 실패:", err);
    });
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
