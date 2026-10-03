function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const certificationSlides = Array.from(
  document.querySelectorAll(".certification-slide"),
);
const previousCertificationGroup = document.querySelector(
  "#certifications-previous",
);
const nextCertificationGroup = document.querySelector("#certifications-next");
const certificationStatus = document.querySelector("#certifications-status");

if (
  certificationSlides.length > 0 &&
  previousCertificationGroup &&
  nextCertificationGroup &&
  certificationStatus
) {
  let currentCertificationGroup = 0;
  const certificationsPerGroup = 6;
  const certificationCount = certificationSlides.reduce(
    (count, slide) => count + slide.querySelectorAll(".certification-card").length,
    0,
  );

  function showCertificationGroup(groupIndex) {
    currentCertificationGroup = groupIndex;
    certificationSlides.forEach((slide, index) => {
      slide.hidden = index !== currentCertificationGroup;
    });
    previousCertificationGroup.disabled = currentCertificationGroup === 0;
    nextCertificationGroup.disabled =
      currentCertificationGroup === certificationSlides.length - 1;

    const firstCertification =
      currentCertificationGroup * certificationsPerGroup + 1;
    const lastCertification = Math.min(
      firstCertification + certificationsPerGroup - 1,
      certificationCount,
    );
    certificationStatus.textContent = `Showing ${firstCertification}-${lastCertification} of ${certificationCount} certifications`;
  }

  previousCertificationGroup.addEventListener("click", () => {
    if (currentCertificationGroup > 0) {
      showCertificationGroup(currentCertificationGroup - 1);
    }
  });

  nextCertificationGroup.addEventListener("click", () => {
    if (currentCertificationGroup < certificationSlides.length - 1) {
      showCertificationGroup(currentCertificationGroup + 1);
    }
  });

  showCertificationGroup(currentCertificationGroup);
}
